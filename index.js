
// ============================================================
// OMART MARKETPLACE
// Main marketplace frontend logic
// ============================================================


// ============================================================
// IMPORTS
// ============================================================

import { CONFIG } from "./config/config.js";
import { fetchData } from "./fetch_algorithms/algorithms.js";


// ============================================================
// CONFIGURATION
// ============================================================

const SERVER_URL = CONFIG.SERVER_URL;

const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});


// ============================================================
// DOM ELEMENTS
// ============================================================

// Header / navigation
const profile = document.querySelector(".profile");
const userIcon = document.querySelector(".user");
const authButton = document.querySelector("#auth");

const searchInput = document.querySelector(".search-input");
const searchIcon = document.querySelector(".search-icon");
const keySearch = document.querySelector(".key-search");


// Main content
const main = document.querySelector(".main");
const loadingOverlay = document.querySelector("#loading-overlay");
const noFoundProduct = document.querySelector(".no-found-products");
const noInternet = document.querySelector(".no-internet");


// Toast
const toast = document.querySelector(".toast");
const toastIcon = document.querySelector(".toast-icon > i");
const toastHeader = document.querySelector(".toast-content > h4");
const toastText = document.querySelector(".toast-text");


// Cart
const cartOverlay = document.querySelector(".cart-overlay");
const cartClose = cartOverlay.querySelector(".cart-close-btn");

const cartOrderMinus = cartOverlay.querySelector(".minus");
const cartOrderQuantity = cartOverlay.querySelector(".qty-number");
const cartOrderAdd = cartOverlay.querySelector(".plus");

const cartBuyOrder = cartOverlay.querySelector(".cart-buy-btn");
const cartTotalAmount = cartOverlay.querySelector(".total-amount");


// Checkout
const paymentOverlay = document.querySelector(".payment-overlay");
const cancelPurchase = paymentOverlay.querySelector(".cancel-purchase");
const purchaseButton = paymentOverlay.querySelector(".purchase-btn");
const customerNumberInput = paymentOverlay.querySelector(
    ".customer-number-input"
);


// Order success
const orderSuccess = document.querySelector(".success-overlay");
const successCloseButton = orderSuccess.querySelector(".success-close-btn");
const displayOrderId = orderSuccess.querySelector("#display-order-id");


// ============================================================
// APPLICATION STATE
// ============================================================

let currentUser = JSON.parse(
    localStorage.getItem("user") || "null"
);

let searchOpen = false;

let currentProduct = null;

let unitPrice = 0;
let countryCode = null;

let iti = null;


// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener("DOMContentLoaded", initializeMarketplace);


async function initializeMarketplace() {

    toast.classList.add("hide");

    showLoading(true);

    try {
        await insertCategories();
        const categories = getLocalCategories();
        if (!categories || categories.length === 0) {
            showNoProducts();
            return;
        }

        // Select first category
        selectCategory(categories[0]);
        await getProducts(categories[0]);

    } catch (error) {
        console.error(
            "Marketplace initialization failed:",
            error
        );
        showInternetError();
    } finally {
        showLoading(false);

    }

    initializePhoneInput();
    setupUserState();
}


// ============================================================
// LOADING
// ============================================================

function showLoading(show) {

    loadingOverlay.style.display = show
        ? "flex"
        : "none";
}

// ============================================================
// TOAST
// ============================================================

function showToast(
    icon,
    header,
    text,
    iconColor = "white"
) {

    toastIcon.className = icon;
    toastIcon.style.color = iconColor;
    toastHeader.textContent = header;
    toastText.textContent = text;
    toast.classList.remove("hide");

    setTimeout(() => {
        toast.classList.add("show");
    }, 50);

    setTimeout(() => {

        toast.classList.remove("show");
        toast.classList.add("hide");

    }, 3000);
}


// ============================================================
// USER / AUTHENTICATION
// ============================================================

function setupUserState() {
    if (!authButton) return;

    const businessLabel =
        authButton.querySelector(".business-label");

    const businessAction =
        authButton.querySelector(".business-action");

    if (!businessLabel || !businessAction) return;


    businessLabel.textContent = "Business";

    businessAction.textContent = currentUser
        ? "Open Business Console"
        : "Sign in / Create account";
}


function handleAuthentication() {

    if (currentUser) {
        window.location.href = "/main/main.html";
    } else {
        window.location.href = "/auth/auth.html";
    }
}


// ============================================================
// CATEGORIES
// ============================================================

async function insertCategories() {

    const storedCategories = getLocalCategories();
    let online = true;


    // --------------------------------------------------------
    // Check server connection
    // --------------------------------------------------------

    try {

        const pingResponse = await fetchData({
            INSTRUCTION: "PING"
        });

        if (
            !pingResponse ||
            pingResponse.status !== "OK"
        ) {
            online = false;
        }

    } catch (error) {
        online = false;
    }


    // --------------------------------------------------------
    // Online
    // --------------------------------------------------------

    if (online) {

        try {

            const response = await fetchData({
                INSTRUCTION: "GET-CATEGORIES"
            });

            if (
                response &&
                Array.isArray(response.Product_Categories)
            ) {

                const categories =
                    response.Product_Categories;

                displayCategories(categories);
                saveLocalCategories(categories);
                return categories;
            }

        } catch (error) {

            console.error(
                "Failed to fetch categories:",
                error
            );
        }


        // Server failed → use cache

        if (storedCategories) {

            displayCategories(storedCategories);
            return storedCategories;
        }

    }


    // --------------------------------------------------------
    // Offline
    // --------------------------------------------------------

    if (storedCategories) {

        displayCategories(storedCategories);
        return storedCategories;
    }

    keySearch.innerHTML =
        "<p>No categories available</p>";

    return [];
}


function displayCategories(categories) {

    keySearch.innerHTML = "";

    const fragment =
        document.createDocumentFragment();

    categories.forEach(category => {
        const categoryElement =
            document.createElement("div");

        categoryElement.className = "key";

        const text =
            document.createElement("p");
        text.textContent = category;
        categoryElement.appendChild(text);
        fragment.appendChild(categoryElement);
    });
    keySearch.appendChild(fragment);
}


function selectCategory(category) {

    const categoryElements =
        keySearch.querySelectorAll(".key");

    categoryElements.forEach(element => {
        const text =
            element.querySelector("p")?.textContent;
        element.classList.toggle(
            "selected",
            text === category
        );
    });
}


function saveLocalCategories(categories) {
    try {
        localStorage.setItem(
            "Product-Categories",
            JSON.stringify(categories)
        );

    } catch (error) {
        console.warn(
            "Could not save categories:",
            error
        );
    }
}


function getLocalCategories() {

    try {

        const stored =
            localStorage.getItem(
                "Product-Categories"
            );

        return stored
            ? JSON.parse(stored)
            : null;

    } catch (error) {

        console.warn(
            "Could not read categories:",
            error
        );

        return null;
    }
}


// ============================================================
// PRODUCTS
// ============================================================

async function getProducts(keyword) {

    hideContentStates();

    const payload = {
        INSTRUCTION: "GET-PRODUCT",
        KeySearch: keyword
    };


    let products;


    try {

        products = await fetchData(payload);

    } catch (error) {

        console.error(
            "Failed to get products:",
            error
        );

        showInternetError();

        return;
    }


    if (
        Array.isArray(products) &&
        products.length > 0
    ) {

        renderProducts(products);
        return;
    }

    if (
        Array.isArray(products) &&
        products.length === 0
    ) {

        showNoProducts();
        return;
    }

    showInternetError();
}


// ============================================================
// SEARCH
// ============================================================

async function makeSearch(keyword) {
    hideContentStates();
    showLoading(true);

    try {

        const products = await fetchData({
            INSTRUCTION: "SEARCH",
            input: keyword
        });


        if (
            Array.isArray(products) &&
            products.length > 0
        ) {

            renderProducts(products);
            return;
        }


        if (
            Array.isArray(products) &&
            products.length === 0
        ) {

            showNoProducts();
            return;
        }


        showInternetError();

    } catch (error) {

        console.error(
            "Search failed:",
            error
        );

        showInternetError();

    } finally {
        showLoading(false);
    }
}


// ============================================================
// PRODUCT RENDERING
// ============================================================

function renderProducts(products) {

    main.innerHTML = "";
    const fragment =
        document.createDocumentFragment();

    products.forEach(product => {
        const productCard =
            createProductCard(product);
        fragment.appendChild(productCard);

    });


    main.appendChild(fragment);
    main.style.display = "grid";
    noFoundProduct.style.display = "none";
    noInternet.style.display = "none";
}


function createProductCard(product) {
    const card =
        document.createElement("div");
    card.className = "product-card";
    card.dataset.productId =
        product.prodID;

    card.innerHTML = `
        <div class="product-image">

            <img
                src="${SERVER_URL}/products/${product.ImageUrl}"
                alt="${escapeHTML(product.Name)}"
                class="prod-img"
                loading="lazy"
            >

        </div>

        <div class="product-info">

            <div class="retailer">

                <img
                    src="${SERVER_URL}/profile/${product.profilePic}"
                    alt="${escapeHTML(product.RetailerName)}"
                    loading="lazy"
                    class="retailer_profile_pic"
                    onerror="
                        this.onerror = null;
                        this.src =
                        'https://cdn-icons-png.flaticon.com/512/149/149071.png';
                    "
                >


                <div class="user-detail">

                    <span class="name">
                        ${escapeHTML(product.RetailerName)}
                    </span>

                    <span class="retailerID">
                        ${escapeHTML(product.RetailerID)}
                    </span>

                </div>


                <button
                    type="button"
                    class="view-page"
                >

                    Visit Store

                    <i
                        class="fa-solid fa-arrow-up-right-from-square"
                    ></i>

                </button>

            </div>

            <h4 class="product-name">
                ${escapeHTML(product.Name)}
            </h4>


            <h3 class="product-price">

                ${escapeHTML(product.currencyCode)}
                ${formatter.format(product.Price)}

            </h3>


            <p class="product-description">

                ${escapeHTML(product.Description)}

            </p>


            <div class="prouduct-cart-bottom">

                <p class="posted-at">
                    posted ${escapeHTML(product.postedAt)}
                </p>


                <button
                    type="button"
                    class="cart"
                    aria-label="Add ${escapeHTML(product.Name)} to cart"
                >

                    <i
                        class="fa-solid fa-cart-shopping"
                    ></i>

                </button>

            </div>

        </div>
    `;


    return card;
}


// ============================================================
// SIMPLE HTML ESCAPE
// Prevent product data from injecting HTML
// ============================================================

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ============================================================
// CONTENT STATES
// ============================================================

function hideContentStates() {

    main.style.display = "none";

    noFoundProduct.style.display = "none";

    noInternet.style.display = "none";
}


function showNoProducts() {

    main.style.display = "none";

    noInternet.style.display = "none";

    noFoundProduct.style.display = "flex";
}


function showInternetError() {

    main.style.display = "none";

    noFoundProduct.style.display = "none";

    noInternet.style.display = "flex";
}


// ============================================================
// CART
// ============================================================

async function openCart(productCard) {

    const productId =
        productCard.dataset.productId;

    const productName =
        productCard.querySelector(
            ".product-name"
        ).textContent;

    const productPriceText =
        productCard.querySelector(
            ".product-price"
        ).textContent.trim();


    const productDescription =
        productCard.querySelector(
            ".product-description"
        ).textContent;

    const retailerName =
        productCard.querySelector(
            ".name"
        ).textContent;

    const retailerId =
        productCard.querySelector(
            ".retailerID"
        ).textContent;


    const productImage =
        productCard.querySelector(
            ".prod-img"
        ).src;

    const retailerProfile =
        productCard.querySelector(
            ".retailer_profile_pic"
        ).src;


    // --------------------------------------------------------
    // Extract currency and price
    // --------------------------------------------------------

    const priceParts =
        productPriceText.split(/\s+/);

    countryCode = priceParts[0];

    const rawPrice =
        priceParts.slice(1).join("");


    unitPrice =
        parseFloat(
            rawPrice.replace(/,/g, "")
        );


    if (Number.isNaN(unitPrice)) {

        showToast(
            "fa-solid fa-money-bill",
            "Product Price",
            "Unable to read product price",
            "red"
        );

        return;
    }


    currentProduct = {
        id: productId,
        name: productName,
        price: unitPrice,
        currency: countryCode,
        description: productDescription,
        retailerName,
        retailerId,
        image: productImage,
        retailerProfile
    };


    // --------------------------------------------------------
    // Get retailer information
    // --------------------------------------------------------

    const payload = {
        INSTRUCTION:
            "GET-RETAILER-EMAIL & PHONE",

        RetailerID: retailerId,

        productId
    };


    showLoading(true);


    try {

        const result =
            await fetchData(payload);


        if (!result) {

            throw new Error(
                "No retailer information returned"
            );
        }


        populateCart(result);

        cartOverlay.style.display = "flex";

    } catch (error) {

        console.error(
            "Failed to open cart:",
            error
        );

        showToast(
            "fa-solid fa-exclamation",
            "Error",
            "Sorry, an error occurred",
            "red"
        );

    } finally {

        showLoading(false);

    }
}


// ============================================================
// CART UI
// ============================================================

function populateCart(retailer) {

    cartOverlay.querySelector(
        ".cart-retailer__image"
    ).src = currentProduct.retailerProfile;


    cartOverlay.querySelector(
        ".cart-product__image"
    ).src = currentProduct.image;


    cartOverlay.querySelector(
        ".cart-product__name"
    ).textContent = currentProduct.name;


    cartOverlay.querySelector(
        ".cart-product__price"
    ).textContent =
        `${currentProduct.currency} ${formatter.format(currentProduct.price)}`;


    cartOverlay.querySelector(
        ".cart-product__description"
    ).textContent =
        currentProduct.description;


    cartOverlay.querySelector(
        ".cart-retailer__name"
    ).textContent =
        currentProduct.retailerName;


    cartOverlay.querySelector(
        ".cart-retailer__email"
    ).textContent =
        retailer.Email;


    cartOverlay.querySelector(
        ".cart-retailer__phone"
    ).textContent =
        retailer.Phone;


    cartOrderQuantity.textContent = "1";


    cartTotalAmount.textContent =
        `${currentProduct.currency} ${formatter.format(currentProduct.price)}`;
}


function closeCart() {

    cartOverlay.style.display = "none";
}


function changeQuantity(amount) {

    if (!currentProduct) return;


    let quantity =
        parseInt(
            cartOrderQuantity.textContent,
            10
        );


    quantity =
        Math.max(
            1,
            quantity + amount
        );


    cartOrderQuantity.textContent =
        quantity;


    updateCartTotal(quantity);
}


function updateCartTotal(quantity) {

    const total =
        currentProduct.price * quantity;


    cartTotalAmount.textContent =
        `${currentProduct.currency} ${formatter.format(total)}`;
}


// ============================================================
// CHECKOUT
// ============================================================

function openPayment() {

    if (!currentProduct) return;


    customerNumberInput.value = "";


    cartOverlay.style.display = "none";

    paymentOverlay.style.display = "flex";
}


function closePayment() {

    paymentOverlay.style.display = "none";

    cartOverlay.style.display = "flex";
}


// ============================================================
// PRICE VALIDATION
// ============================================================

function validatePrice(value) {

    const MAX_INTEGER =
        "999999999999999999";


    const cleanValue =
        String(value)
            .trim()
            .replace(/,/g, "");


    const parts =
        cleanValue.split(".");


    const integerPart =
        parts[0];


    if (
        integerPart.length >
        MAX_INTEGER.length
    ) {

        showToast(
            "fa-solid fa-money-bill",
            "Total Purchase",
            "Your purchase amount is too large. Try reducing your purchase quantity.",
            "#e53935"
        );

        return false;
    }


    if (
        integerPart.length ===
        MAX_INTEGER.length &&
        integerPart > MAX_INTEGER
    ) {

        showToast(
            "fa-solid fa-money-bill",
            "Total Purchase",
            "Your purchase amount is too large. Try reducing your purchase quantity.",
            "#e53935"
        );

        return false;
    }


    return true;
}


// ============================================================
// PLACE ORDER
// ============================================================

async function placeOrder() {

    if (!currentProduct) return;


    const quantity =
        parseInt(
            cartOrderQuantity.textContent,
            10
        );


    const total =
        currentProduct.price * quantity;


    // --------------------------------------------------------
    // Validate total
    // --------------------------------------------------------

    if (
        !validatePrice(
            formatter.format(total)
        )
    ) {

        return;
    }


    // --------------------------------------------------------
    // Validate phone number
    // --------------------------------------------------------

    if (!iti) {

        showToast(
            "fa-solid fa-phone",
            "Phone Number",
            "Phone input is not ready yet.",
            "red"
        );

        return;
    }


    if (!iti.isValidNumber()) {

        showToast(
            "fa-solid fa-phone",
            "Invalid Number",
            "The number you entered is invalid.",
            "red"
        );

        return;
    }


    const phone =
        iti.getNumber();


    // --------------------------------------------------------
    // Create payload
    // --------------------------------------------------------

    const payload = {

        INSTRUCTION:
            "PLACE-ORDER",

        ProductId:
            currentProduct.id,

        Quantity:
            quantity,

        CustomerPhone:
            phone,

        ProductName:
            currentProduct.name,

        ProductPrice:
            currentProduct.price
    };


    showLoading(true);


    try {

        const result =
            await fetchData(payload);


        if (
            result &&
            result.status === "OK"
        ) {

            paymentOverlay.style.display =
                "none";


            displayOrderId.textContent =
                "#" + result.orderID;


            orderSuccess.style.display =
                "flex";


            return;
        }


        showToast(
            "fa-solid fa-shopping-cart",
            "Order Placement",
            "Unable to place your order.",
            "red"
        );

    } catch (error) {

        console.error(
            "Order placement failed:",
            error
        );

        showToast(
            "fa-solid fa-shopping-cart",
            "Order Placement",
            "An error occurred while placing your order.",
            "red"
        );

    } finally {

        showLoading(false);

    }
}


// ============================================================
// PHONE INPUT
// ============================================================

function initializePhoneInput() {

    if (
        !window.intlTelInput ||
        !customerNumberInput
    ) {

        console.warn(
            "intl-tel-input is not available."
        );

        return;
    }


    /*
        Use Ghana as the default instead of making
        a browser request to ipinfo.io.

        This avoids the CORS problem you encountered.
    */

    iti = window.intlTelInput(
        customerNumberInput,
        {
            initialCountry: "gh",

            separateDialCode: true,

            useFullscreenPopup: false,

            utilsScript:
                "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.5/build/js/utils.js"
        }
    );
}


// ============================================================
// SEARCH UI
// ============================================================

function toggleSearch() {

    if (!searchOpen) {

        searchInput.style.display =
            "block";

        keySearch.style.display =
            "none";

        searchInput.focus();

        searchOpen = true;

        return;
    }


    const keyword =
        searchInput.value.trim();


    if (keyword !== "") {

        makeSearch(keyword);

        return;
    }


    closeSearch();
}


function closeSearch() {

    searchInput.style.display =
        "none";

    keySearch.style.display =
        "flex";

    searchInput.value = "";

    searchOpen = false;
}


// ============================================================
// CATEGORY CLICK
// ============================================================

async function handleCategoryClick(event) {

    const category =
        event.target.closest(".key");


    if (!category) return;


    const keyword =
        category.querySelector("p")?.textContent;


    if (!keyword) return;


    selectCategory(keyword);


    showLoading(true);


    try {

        await getProducts(keyword);

    } finally {

        showLoading(false);

    }
}


// ============================================================
// HORIZONTAL CATEGORY SCROLL
// ============================================================

function handleCategoryWheel(event) {

    event.preventDefault();


    keySearch.scrollBy({
        left: event.deltaY,
        behavior: "smooth"
    });
}


// ============================================================
// EVENT LISTENERS
// ============================================================

keySearch.addEventListener(
    "click",
    handleCategoryClick
);


keySearch.addEventListener(
    "wheel",
    handleCategoryWheel
);


searchIcon.addEventListener(
    "click",
    toggleSearch
);


searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Enter") {
            return;
        }


        const keyword =
            searchInput.value.trim();


        if (keyword !== "") {

            makeSearch(keyword);

        }

    }
);


authButton.addEventListener(
    "click",
    handleAuthentication
);


// ============================================================
// PRODUCT AREA CLICK DELEGATION
// ============================================================

main.addEventListener(
    "click",
    async event => {

        // ----------------------------------------------------
        // Cart button
        // ----------------------------------------------------

        const cartButton =
            event.target.closest(".cart");


        if (cartButton) {

            const productCard =
                cartButton.closest(".product-card");


            if (productCard) {

                await openCart(productCard);

            }

            return;
        }


        // ----------------------------------------------------
        // Visit store
        // ----------------------------------------------------

        const storeButton =
            event.target.closest(".view-page");


        if (storeButton) {

            const productCard =
                storeButton.closest(".product-card");


            if (!productCard) return;


            const retailerId =
                productCard.querySelector(
                    ".retailerID"
                )?.textContent;


            if (!retailerId) return;


            window.open(
                `${SERVER_URL}/retailer/${encodeURIComponent(retailerId)}`,
                "_blank",
                "noopener,noreferrer"
            );
        }

    }
);


// ============================================================
// CART EVENTS
// ============================================================

cartClose.addEventListener(
    "click",
    closeCart
);


cartOrderMinus.addEventListener(
    "click",
    () => changeQuantity(-1)
);


cartOrderAdd.addEventListener(
    "click",
    () => changeQuantity(1)
);


cartBuyOrder.addEventListener(
    "click",
    openPayment
);


// ============================================================
// PAYMENT EVENTS
// ============================================================

cancelPurchase.addEventListener(
    "click",
    closePayment
);


purchaseButton.addEventListener(
    "click",
    placeOrder
);


// ============================================================
// SUCCESS SCREEN
// ============================================================

successCloseButton.addEventListener(
    "click",
    () => {

        orderSuccess.style.display =
            "none";

    }
);


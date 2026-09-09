// ═══════════════════════════════════════════════════════════════
// BICYCON / OMART — RETAILER APP | main.js
// ═══════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════

import { CONFIG } from "../config/config.js";
import {
    fetchData,
    UploadFileWithData
} from "../fetch_algorithms/algorithms.js";

const SERVER_URL = CONFIG.SERVER_URL;

const User = JSON.parse(localStorage.getItem("user") || "{}");


// ═══════════════════════════════════════════════════════════════
// GLOBAL HELPERS
// ═══════════════════════════════════════════════════════════════

const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const countFormatter = new Intl.NumberFormat();


// ═══════════════════════════════════════════════════════════════
// ELEMENT REFERENCES
// ═══════════════════════════════════════════════════════════════

// ── Navigation / Business ────────────────────────────────────

const businessName = document.querySelector(".business-name");
const businessLogo = document.querySelector(".business-logo");
const visitStoreFront = document.querySelector(".visite-store-front");

const NavDash = document.querySelector(".nav-tab.dash");
const NavProducts = document.querySelector(".nav-tab.products");
const NavOrders = document.querySelector(".nav-tab.orders");
const NavStore = document.querySelector(".store");
const Profile = document.querySelector(".nav-profile");
const Back = document.querySelector(".back");


// ── Main Sections ─────────────────────────────────────────────

const DashSection = document.querySelector(".dash-section");
const ProductSection = document.querySelector(".product-section");
const ProductList = document.querySelector(".product-list");
const NoProduct = document.querySelector(".no-product-section");
const ProductCount = document.querySelector(".product-count > p");

const MyProfile = document.querySelector(".my-profile");
const OrdersList = document.querySelector(".orders-list");
const PlacedOrdersList = document.querySelector(".order-section");

const StoreSection = document.querySelector(".my-store");


// ── Empty / Error States ──────────────────────────────────────

const NoInternet = document.querySelector(".no-internet");
const NoFoundOrders = document.querySelector(".no-found-products");


// ── Loading ───────────────────────────────────────────────────

const Loading = document.querySelector("#loading-overlay");


// ── Floating Buttons ──────────────────────────────────────────

const Plus = document.querySelector(".plus");
const Upgrade = document.querySelector(".upgrade-btn");


// ── Profile Navigation ────────────────────────────────────────

const UserIcon = document.querySelector(".user-icon");
const ProPic = document.querySelector(".pro-pic");
const ProfileImg = document.querySelector(".pro-pic > img");


// ── Toast ─────────────────────────────────────────────────────

const toast = document.querySelector(".toast");
const toastIcon = document.querySelector(".toast-icon-i");
const toastHeader = document.querySelector(".toast-header-text");
const toastText = document.querySelector(".toast-text");
const toastClose = document.querySelector(".toast-close");


// ── Add Product ────────────────────────────────────────────────

const AddProduct = document.querySelector(".add-prod-overlay");

const prodProfile = AddProduct.querySelector(".prod-profile");
const prodIcon = AddProduct.querySelector(".prod-icon");
const prodImage = AddProduct.querySelector(".prod-pro-pic");

const ProdName = AddProduct.querySelector(".prod-name");
const ProdPrice = AddProduct.querySelector(".prod-price");
const ProdDisc = AddProduct.querySelector(".prod-description");

const cameraBtn = AddProduct.querySelector(".camera");
const cancelImgBtn = AddProduct.querySelector(".cancel");
const fileInput = AddProduct.querySelector(".file-input");

const AddNewProd = AddProduct.querySelector(".add-btn");
const CancelNewProd = AddProduct.querySelectorAll(".cancel-btn");

const ProductCategory = AddProduct.querySelector(".custom-select");


// ── Edit Product ──────────────────────────────────────────────

const EditProduct = document.querySelector(".edith-prod-overlay");

const EditProdImg = EditProduct.querySelector(".prod-image-update");
const EditFileInput = EditProduct.querySelector(
    ".prod-image-edit-file-input"
);

const SelectEditImg = EditProduct.querySelector(".select-image");
const CancelEditImg = EditProduct.querySelector(
    ".cancel-selected-image"
);

const EditProdName = EditProduct.querySelector(".edith-prod-name");
const EditProdPrice = EditProduct.querySelector(".edith-prod-price");
const EditProdCat = EditProduct.querySelector(
    ".edith-prod-category > p"
);
const EditProdDisc = EditProduct.querySelector(
    ".edith-prod-discription"
);

const SaveEdit = EditProduct.querySelector(".save-edith");
const CancelEdits = EditProduct.querySelectorAll(".cancel-edth");


// ── Profile Editing ───────────────────────────────────────────

const EditUserIcon = document.querySelector(".edith-user-icon");

const DisplayProfileContainer =
    document.querySelector(".profile-pic");

const DisplayProfileImage =
    document.querySelector(".profile-pic > img");

const PickNewImage =
    document.querySelector(".profile-actions");

const NewImageInput =
    document.querySelector("#profile-file");

const UploadNewImage =
    document.querySelector(".upload-new-profile");

const EditOldProfile =
    document.querySelector(".edith-old-profile");

const CancelProfileUpdate =
    document.querySelector(".cance-profile-update");


// ── Account Information ───────────────────────────────────────

const DisplayAccountId =
    document.querySelector(".display-account-id");

const DisplayAccountName =
    document.querySelector(".display-account-name");

const DisplayOldEmail =
    document.querySelector(".display-email");

const NewEmailInput =
    document.querySelector(".new-email-input");

const UploadNewEmail =
    document.querySelector(".upload-new-email");

const EditOldEmail =
    document.querySelector(".edith-old-email");

const CancelNewEmail =
    document.querySelector(".cancel-email-update");

const DisplayOldPhone =
    document.querySelector(".display-phone");

const NewPhoneInput =
    document.querySelector(".new-phone-input");

const UploadNewPhone =
    document.querySelector(".upload-new-phone");

const EditOldPhone =
    document.querySelector(".edith-old-phone");

const CancelNewPhone =
    document.querySelector(".cancel-phone-update");


// ── Account Actions ───────────────────────────────────────────

const LogOut = document.querySelector(".log-out > button");

const CopyIcon = document.querySelector(".copy-icon");
const CopyLink = document.querySelector(".copy-link");


// ── Upgrade ───────────────────────────────────────────────────

const UpgradeOverlay =
    document.querySelector(".upgrade-overlay");

const CancelUpgrade =
    document.querySelector(".cancel-upgrade");


// ═══════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});

window.addEventListener("load", () => {
    setTimeout(() => {
        if (NavDash) {
            NavDash.click();
        }
    }, 0);
});


function initializeApp() {

    if (toast) {
        toast.classList.add("hide");
    }

    SetProfile();


    // ═══════════════════════════════════════════════════════════
    // PROFILE EDITING CONTROLS
    // Initially ONLY Edit Profile is visible.
    // ═══════════════════════════════════════════════════════════

    if (EditOldProfile) {
        EditOldProfile.style.display = "inline-flex";
    }

    if (UploadNewImage) {
        UploadNewImage.style.display = "none";
    }

    if (CancelProfileUpdate) {
        CancelProfileUpdate.style.display = "none";
    }

    if (PickNewImage) {
        PickNewImage.style.display = "none";
    }

    if (NewImageInput) {
        NewImageInput.value = "";
    }


    // ── Business information ──────────────────────────────────

    if (businessName) {
        businessName.textContent =
            User["business-name"] || "My Store";
    }

    if (businessLogo && User.profilePic) {
        businessLogo.src =
            `${SERVER_URL}/profile/${User.profilePic}`;
    }

    if (visitStoreFront && User.id) {
        visitStoreFront.href =
            `${SERVER_URL}/retailer/${User.id}`;
    }
}


// ═══════════════════════════════════════════════════════════════
// LOADING HELPERS
// ═══════════════════════════════════════════════════════════════

function showLoading() {

    if (Loading) {
        Loading.style.display = "flex";
    }
}


function hideLoading() {

    if (Loading) {
        Loading.style.display = "none";
    }
}


// ═══════════════════════════════════════════════════════════════
// PROFILE SETUP
// ═══════════════════════════════════════════════════════════════

function SetProfile() {

    const user =
        JSON.parse(localStorage.getItem("user") || "{}");

    if (!user || !user.profilePic) {

        if (UserIcon) {
            UserIcon.style.display = "flex";
        }

        if (ProPic) {
            ProPic.style.display = "none";
        }

        return;
    }


    if (UserIcon) {
        UserIcon.style.display = "none";
    }

    if (ProPic) {
        ProPic.style.display = "flex";
    }

    if (ProfileImg) {
        ProfileImg.src =
            `${SERVER_URL}/profile/${user.profilePic}`;
    }
}


// ═══════════════════════════════════════════════════════════════
// SECTION DISPLAY
// ═══════════════════════════════════════════════════════════════

function resetSections() {

    if (DashSection) {
        DashSection.style.display = "none";
    }

    if (ProductSection) {
        ProductSection.style.display = "none";
    }

    if (MyProfile) {
        MyProfile.style.display = "none";
    }

    if (OrdersList) {
        OrdersList.style.display = "none";
    }

    if (NoFoundOrders) {
        NoFoundOrders.style.display = "none";
    }

    if (NoInternet) {
        NoInternet.style.display = "none";
    }

    if (Plus) {
        Plus.style.display = "none";
    }

    if (Profile) {
        Profile.classList.remove("active-profile");
    }

    NavDash?.classList.remove("active");
    NavProducts?.classList.remove("active");
    NavOrders?.classList.remove("active");
    NavStore?.classList.remove("active");
}


function showDash() {

    resetSections();

    DashSection.style.display = "block";

    NavDash?.classList.add("active");
}


function showProducts() {

    resetSections();

    ProductSection.style.display = "flex";
    ProductList.style.display = "grid";
    Plus.style.display = "flex";

    NavProducts?.classList.add("active");
}


function showNoProduct() {

    resetSections();

    ProductSection.style.display = "flex";
    NoProduct.style.display = "block";
    ProductList.style.display = "none";
    Plus.style.display = "flex";

    NavProducts?.classList.add("active");
}


function showAddProduct() {

    AddProduct.style.display = "flex";


    // ── Reset image ────────────────────────────────────────────

    prodImage.src = "";
    prodImage.style.display = "none";

    prodIcon.style.display = "flex";

    cancelImgBtn.style.display = "none";

    fileInput.value = "";


    // ── Reset category ─────────────────────────────────────────

    ProductCategory.dataset.value = "";

    const selected =
        ProductCategory.querySelector(".selected");


    if (selected) {

        selected.innerHTML =
            `Select Category
             <i class="fa-solid fa-chevron-down sel-arrow"></i>`;
    }
}


function showMyProfile() {

    resetSections();

    MyProfile.style.display = "flex";

    Profile.classList.add("active-profile");
}


function showOrders() {

    resetSections();

    OrdersList.style.display = "flex";

    NavOrders?.classList.add("active");
}


// ═══════════════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════════════

function showToast(
    iconClasses,
    header,
    message,
    iconColor
) {

    if (!toast) return;

    toastIcon.className = "";

    iconClasses
        .split(" ")
        .forEach(className => {

            if (className) {
                toastIcon.classList.add(className);
            }
        });


    toastIcon.style.color = iconColor;

    toastHeader.textContent = header;
    toastText.textContent = message;


    toast.classList.remove("hide");


    setTimeout(() => {
        toast.classList.add("show");
    }, 50);


    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {
            toast.classList.add("hide");
        }, 300);

    }, 4500);
}


toastClose?.addEventListener("click", () => {

    toast.classList.remove("show");

    setTimeout(() => {
        toast.classList.add("hide");
    }, 300);
});


// ═══════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════

async function Dash() {

    const user =
        JSON.parse(localStorage.getItem("user") || "{}");


    const PendingOrdersTab =
        DashSection.querySelector(".pending-tab");

    const PendingOrdersList =
        DashSection.querySelector(".pending-section");

    const RejectedOrdersTab =
        DashSection.querySelector(".rejected-tab");

    const RejectedOrdersList =
        DashSection.querySelector(".rejected-section");

    const Graph =
        DashSection.querySelector(".graph-container");

    const refreshBtn =
        DashSection.querySelector(".refresh");

    const FromDateInput =
        DashSection.querySelector(".from-date");

    const ToDateInput =
        DashSection.querySelector(".to-date");


    // ── Currency ──────────────────────────────────────────────

    const currency =
        user["currency"] || "$";


    DashSection.querySelector(
        ".dash-card .currency-code"
    ).textContent = currency;


    DashSection.querySelector(
        ".actual-revenue .currency-code"
    ).textContent = currency;


    // ── Order tabs ────────────────────────────────────────────

    PendingOrdersList.style.display = "flex";
    RejectedOrdersList.style.display = "none";


    PendingOrdersTab.onclick = () => {

        PendingOrdersTab.classList.add("active");
        RejectedOrdersTab.classList.remove("active");

        PendingOrdersList.style.display = "flex";
        RejectedOrdersList.style.display = "none";
    };


    RejectedOrdersTab.onclick = () => {

        PendingOrdersTab.classList.remove("active");
        RejectedOrdersTab.classList.add("active");

        PendingOrdersList.style.display = "none";
        RejectedOrdersList.style.display = "flex";
    };


    // ── Date setup ────────────────────────────────────────────

    const today = () =>
        new Date().toISOString().split("T")[0];


    FromDateInput.value = today();
    ToDateInput.value = today();


    // ── Load dashboard data ───────────────────────────────────

    async function GetDashData() {

        const fromDate =
            FromDateInput.value;

        const toDate =
            ToDateInput.value;


        if (
            new Date(fromDate).getTime() >
            new Date(toDate).getTime()
        ) {

            showToast(
                "fa-solid fa-exclamation",
                "Date Range",
                "The date range you selected is incorrect.",
                "#e53935"
            );

            return;
        }


        const payload = {

            INSTRUCTION: "GET-REVENUE-DATA",

            fromDate,

            toDate,

            userid: user.id
        };

        let EstimatedRevenue = 0;
        let ActualRevenue = 0;
        let PendingRevenue = 0;
        let RejectedRevenue = 0;

        let PendingOrdersCount = 0;
        let RejectedOrdersCount = 0;


        refreshBtn.classList.add(
            "refresh-spinning"
        );


        try {

            const Result =
                await fetchData(payload);


            if (!Result) {

                showToast(
                    "fa-solid fa-exclamation",
                    "Error",
                    "An error occurred while fetching dashboard data. Please check your internet connection.",
                    "#e53935"
                );

                return;
            }


            PendingOrdersList.innerHTML = "";
            RejectedOrdersList.innerHTML = "";
            Graph.innerHTML = "";


            for (const key in Result) {

                const rows = Result[key];


                if (
                    !Array.isArray(rows) ||
                    rows.length === 0
                ) {
                    continue;
                }


                const dateObj =
                    new Date(key);


                const dayLabel =
                    dateObj.toLocaleDateString(
                        "en-US",
                        {
                            weekday: "short",
                            timeZone: "UTC"
                        }
                    );


                const formattedDate =
                    dateObj.toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            day: "numeric",
                            timeZone: "UTC"
                        }
                    );


                let localEstimatedRevenue = 0;
                let localApproved = 0;
                let localPending = 0;
                let localRejected = 0;


                rows.forEach(row => {

                    const orderAmount =
                        Number(row["orderTotal"]) || 0;

                    const orderStatus =
                        row["orderStatus"];


                    localEstimatedRevenue +=
                        orderAmount;


                    // ── Approved ────────────────────────────

                    if (
                        orderStatus === "accepted"
                    ) {

                        localApproved +=
                            orderAmount;
                    }


                    // ── Pending ────────────────────────────

                    else if (
                        orderStatus === "Pending"
                    ) {

                        localPending +=
                            orderAmount;

                        PendingOrdersCount++;


                        const orderCard =
                            document.createElement("div");


                        orderCard.classList.add(
                            "list-card"
                        );


                        orderCard.innerHTML = `

                            <div class="left-info">

                                <span class="list-number">
                                    ${PendingOrdersCount}
                                </span>

                                <span class="list-order-id">
                                    #${row.orderID}
                                </span>

                            </div>


                            <div class="right-info">

                                <span class="status-badge status-pending">
                                    Pending
                                </span>

                                <button
                                    class="list-action"
                                    type="button">
                                    View order
                                </button>

                            </div>
                        `;


                        PendingOrdersList.appendChild(
                            orderCard
                        );
                    }


                    // ── Rejected ────────────────────────────

                    else {

                        localRejected +=
                            orderAmount;

                        RejectedOrdersCount++;


                        const orderCard =
                            document.createElement("div");


                        orderCard.classList.add(
                            "list-card"
                        );


                        orderCard.innerHTML = `

                            <div class="left-info">

                                <span class="list-number">
                                    ${RejectedOrdersCount}
                                </span>

                                <span class="list-order-id">
                                    #${row.orderID}
                                </span>

                            </div>


                            <div class="right-info">

                                <span class="status-badge status-rejected">
                                    Rejected
                                </span>

                                <button
                                    class="list-action"
                                    type="button">
                                    View order
                                </button>

                            </div>
                        `;


                        RejectedOrdersList.appendChild(
                            orderCard
                        );
                    }
                });


                // ── Global totals ─────────────────────────

                EstimatedRevenue +=
                    localEstimatedRevenue;

                ActualRevenue +=
                    localApproved;

                PendingRevenue +=
                    localPending;

                RejectedRevenue +=
                    localRejected;


                // ── Graph ─────────────────────────────────

                if (
                    localEstimatedRevenue <= 0
                ) {
                    continue;
                }


                const createBarMarkup =
                    (amount, typeClass) => {

                        const percentage =
                            (amount /
                                localEstimatedRevenue) *
                            100;


                        return `

                            <div class="bar-column">

                                <div class="amount-tooltip">
                                    ${currency}${amount.toLocaleString()}
                                </div>

                                <div class="parent-bar">

                                    <div
                                        class="inner-bar ${typeClass}"
                                        style="height: ${percentage}%;">

                                    </div>

                                </div>

                            </div>
                        `;
                    };


                let barsHTML = "";


                if (localApproved > 0) {

                    barsHTML +=
                        createBarMarkup(
                            localApproved,
                            "approved-bg"
                        );
                }


                if (localPending > 0) {

                    barsHTML +=
                        createBarMarkup(
                            localPending,
                            "pending-bg"
                        );
                }


                if (localRejected > 0) {

                    barsHTML +=
                        createBarMarkup(
                            localRejected,
                            "rejected-bg"
                        );
                }


                Graph.insertAdjacentHTML(
                    "beforeend",
                    `

                    <div
                        class="day-group"
                        data-date="${key}">

                        <div class="date-header">
                            ${formattedDate}
                        </div>

                        <div class="bars-container">
                            ${barsHTML}
                        </div>

                        <div class="day-label-badge">
                            ${dayLabel}
                        </div>

                    </div>
                    `
                );
            }


            // ── Update dashboard metrics ──────────────────

            DashSection.querySelector(
                ".estimated-revenue .amount"
            ).textContent =
                `${currency} ${formatter.format(
                    EstimatedRevenue
                )}`;


            DashSection.querySelector(
                ".actual-revenue .amount"
            ).textContent =
                `${currency} ${formatter.format(
                    ActualRevenue
                )}`;


            DashSection.querySelector(
                ".pending-orders .amount"
            ).textContent =
                `${currency} ${formatter.format(
                    PendingRevenue
                )}`;


            DashSection.querySelector(
                ".rejected-orders .amount"
            ).textContent =
                `${currency} ${formatter.format(
                    RejectedRevenue
                )}`;


            DashSection.querySelector(
                ".pending-orders .order-count"
            ).textContent =
                `${countFormatter.format(
                    PendingOrdersCount
                )} Orders`;


            DashSection.querySelector(
                ".rejected-orders .order-count"
            ).textContent =
                `${countFormatter.format(
                    RejectedOrdersCount
                )} Orders`;

        } catch (error) {

            console.error(
                "Dashboard error:",
                error
            );


            showToast(
                "fa-solid fa-exclamation",
                "Network Error",
                "Unable to load dashboard data. Please check your internet connection.",
                "#e53935"
            );

        } finally {

            refreshBtn.classList.remove(
                "refresh-spinning"
            );
        }
    }


    refreshBtn.onclick =
        GetDashData;


    await GetDashData();

    showDash();
}


// ═══════════════════════════════════════════════════════════════
// FIND ORDER
// ═══════════════════════════════════════════════════════════════

async function findOrder(selectedOrderId) {

    let orderCards =
        document.querySelectorAll(
            ".order-section .order-cart"
        );


    if (orderCards.length === 0) {

        try {

            const orderList =
                await fetchData({
                    INSTRUCTION: "GET-MY-ORDERS",
                    User_id: User.id
                });


            insertOrdersCard(
                orderList,
                User.currency
            );


            orderCards =
                document.querySelectorAll(
                    ".order-section .order-cart"
                );

        } catch (error) {

            console.error(
                "Order lookup error:",
                error
            );


            showToast(
                "fa-solid fa-exclamation",
                "Network Error",
                "Sorry, an error occurred. Please check your internet connection.",
                "red"
            );

            return;
        }
    }


    for (const orderCard of orderCards) {

        const orderIdElement =
            orderCard.querySelector(".order-id");


        if (!orderIdElement) {
            continue;
        }


        const targetedOrderId =
            orderIdElement.textContent
                .replace("Order #", "")
                .trim();


        const cleanSelectedId =
            selectedOrderId
                .replace("#", "")
                .trim();


        if (
            targetedOrderId ===
            cleanSelectedId
        ) {

            orderCard.classList.add("active");

            showOrders();


            orderCard.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


            setTimeout(() => {

                orderCard.classList.remove(
                    "active"
                );

            }, 3000);


            break;
        }
    }
}


// ═══════════════════════════════════════════════════════════════
// DASHBOARD ORDER LIST EVENTS
// ═══════════════════════════════════════════════════════════════

function setupDashboardOrderEvents() {

    const handleOrderClick =
        event => {

            const button =
                event.target.closest(
                    ".list-action"
                );


            if (!button) return;


            const orderCard =
                button.closest(
                    ".list-card"
                );


            if (!orderCard) return;


            const orderId =
                orderCard
                    .querySelector(
                        ".list-order-id"
                    )
                    ?.textContent
                    .trim();


            if (orderId) {
                findOrder(orderId);
            }
        };


    const pendingSection =
        DashSection.querySelector(
            ".pending-section"
        );


    const rejectedSection =
        DashSection.querySelector(
            ".rejected-section"
        );


    pendingSection?.addEventListener(
        "click",
        handleOrderClick
    );


    rejectedSection?.addEventListener(
        "click",
        handleOrderClick
    );
}


setupDashboardOrderEvents();


// ═══════════════════════════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════════════════════════

async function getMyProducts() {

    const user =
        JSON.parse(
            localStorage.getItem("user") || "{}"
        );


    if (!user?.id) {

        showNoProduct();

        return;
    }


    showLoading();


    try {

        const list =
            await fetchData({
                INSTRUCTION: "GET-MY-PRODUCTS",
                User_id: user.id
            });


        if (
            !Array.isArray(list) ||
            list.length === 0
        ) {

            showNoProduct();

            return;
        }


        ProductList.innerHTML = "";

        NoProduct.style.display = "none";


        const fragment =
            document.createDocumentFragment();


        list.forEach(product => {

            const card =
                document.createElement("div");


            card.classList.add(
                "list-card"
            );


            card.innerHTML = `

                <img
                    src="${SERVER_URL}/products/${product.Url}"
                    alt="${product.name}"
                    class="prod-img"
                    loading="lazy"
                />


                <div class="card-body">

                    <p class="pord-name">
                        ${product.name}
                    </p>

                    <p class="prod-price">
                        ${product.currencyCode}
                        ${formatter.format(
                product.price
            )}
                    </p>

                    <p class="prod-id">
                        ${product.Id}
                    </p>

                    <p class="final-prod-description">
                        ${product.description}
                    </p>

                </div>


                <div class="edith-delete-prod">

                    <div
                        class="edith-prod"
                        data-id="${product.Id}">

                        <i class="fa-solid fa-pen"></i>
                        Edit

                    </div>


                    <div
                        class="delete-prod"
                        data-id="${product.Id}">

                        <i class="fa-solid fa-trash"></i>
                        Delete

                    </div>

                </div>


                <p class="posted-at">
                    Posted ${product.postedAt}
                </p>
            `;


            fragment.appendChild(card);
        });


        ProductList.appendChild(fragment);


        ProductCount.textContent =
            list.length;


        showProducts();


        // ── Edit ──────────────────────────────────────────────

        ProductList
            .querySelectorAll(".edith-prod")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () =>
                        openEditProduct(
                            button.dataset.id,
                            list
                        )
                );
            });


        // ── Delete ────────────────────────────────────────────

        ProductList
            .querySelectorAll(".delete-prod")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () =>
                        deleteProduct(
                            button.dataset.id
                        )
                );
            });

    } catch (error) {

        console.error(
            "Product loading error:",
            error
        );


        showToast(
            "fa-solid fa-exclamation",
            "Loading Failed",
            "Unable to load your products.",
            "#e53935"
        );

    } finally {

        hideLoading();
    }
}


// ═══════════════════════════════════════════════════════════════
// ORDERS
// ═══════════════════════════════════════════════════════════════

async function getPlacedOrders() {

    const user =
        JSON.parse(
            localStorage.getItem("user") || "{}"
        );


    if (!user?.id) return;


    showLoading();


    try {

        const orderList =
            await fetchData({
                INSTRUCTION: "GET-MY-ORDERS",
                User_id: user.id
            });


        if (!Array.isArray(orderList)) {

            resetSections();

            NoInternet.style.display =
                "flex";

            NavOrders?.classList.add(
                "active"
            );

            return;
        }


        if (orderList.length === 0) {

            resetSections();

            NoFoundOrders.style.display =
                "flex";

            NavOrders?.classList.add(
                "active"
            );

            return;
        }


        insertOrdersCard(
            orderList,
            user.currency
        );


        showOrders();

    } catch (error) {

        console.error(
            "Orders loading error:",
            error
        );


        resetSections();

        NoInternet.style.display =
            "flex";

        NavOrders?.classList.add(
            "active"
        );

    } finally {

        hideLoading();
    }
}


// ═══════════════════════════════════════════════════════════════
// INSERT ORDER CARDS
// ═══════════════════════════════════════════════════════════════

function insertOrdersCard(
    orderList,
    currencyCode
) {

    PlacedOrdersList.innerHTML = "";

    const fragment =
        document.createDocumentFragment();


    orderList.forEach(order => {

        const status =
            (order.status || "")
                .toLowerCase()
                .trim();


        const card =
            document.createElement("div");


        card.classList.add(
            "order-cart"
        );


        card.innerHTML = `

            <div class="order-header">

                <span class="order-index">
                    #${order.index}
                </span>

                <span class="order-id">
                    Order #${order.orderId}
                </span>

                <span class="order-date">
                    ${order.date}
                </span>

                <span class="order-time">
                    ${order.time}
                </span>

            </div>


            <div class="product-info">

                <h4 class="product-name">
                    ${order.productName}
                </h4>

                <span class="product-id">
                    Product ID: #${order.productId}
                </span>

            </div>


            <div class="customer-phone">

                <span class="phone">
                    ${order.customerPhone}
                </span>

                <div class="phone-icon">
                    <i class="fa-solid fa-phone"></i>
                </div>

            </div>


            <div class="order-details">

                <div class="detail">

                    <span>
                        Quantity
                    </span>

                    <strong>
                        ${formatter.format(
            order.quantity
        )}
                    </strong>

                </div>


                <div class="detail">

                    <span>
                        Price
                    </span>

                    <strong>
                        ${currencyCode}
                        ${formatter.format(
            order.amountPerProduct
        )}
                    </strong>

                </div>


                <div class="detail total">

                    <span>
                        Total
                    </span>

                    <strong>
                        ${currencyCode}
                        ${formatter.format(
            order.totalAmount
        )}
                    </strong>

                </div>

            </div>


            <div class="order-cart-actions">

                <button
                    class="accept-btn"
                    type="button">

                    <i class="fa-solid fa-check"></i>
                    Accept

                </button>


                <button
                    class="reject-btn"
                    type="button">

                    <i class="fa-solid fa-x"></i>
                    Reject

                </button>

            </div>


            <div class="order-cart-status">

                <span class="status accepted">
                    Accepted ✓
                </span>

                <span class="status rejected">
                    Rejected ✗
                </span>

            </div>
        `;


        const actions =
            card.querySelector(
                ".order-cart-actions"
            );


        const statusBox =
            card.querySelector(
                ".order-cart-status"
            );


        const accepted =
            card.querySelector(
                ".status.accepted"
            );


        const rejected =
            card.querySelector(
                ".status.rejected"
            );


        actions.style.display = "none";
        statusBox.style.display = "none";
        accepted.style.display = "none";
        rejected.style.display = "none";


        if (status === "pending") {

            actions.style.display =
                "flex";

        } else if (
            status === "accepted"
        ) {

            statusBox.style.display =
                "block";

            accepted.style.display =
                "inline-block";

        } else if (
            status === "rejected"
        ) {

            statusBox.style.display =
                "block";

            rejected.style.display =
                "inline-block";
        }


        fragment.appendChild(card);
    });


    PlacedOrdersList.appendChild(
        fragment
    );
}


// ═══════════════════════════════════════════════════════════════
// ORDER ACTIONS
// ═══════════════════════════════════════════════════════════════

PlacedOrdersList.addEventListener(
    "click",
    async event => {

        const orderCard =
            event.target.closest(
                ".order-cart"
            );


        if (!orderCard) return;


        // ── Call customer ─────────────────────────────────────

        if (
            event.target.closest(
                ".phone-icon"
            )
        ) {

            const phone =
                orderCard
                    .querySelector(
                        ".phone"
                    )
                    ?.textContent
                    .trim();


            if (phone) {
                window.location.href =
                    `tel:${phone}`;
            }


            return;
        }


        // ── Accept / Reject ───────────────────────────────────

        let newStatus = null;


        if (
            event.target.closest(
                ".accept-btn"
            )
        ) {

            newStatus =
                "accepted";
        }


        if (
            event.target.closest(
                ".reject-btn"
            )
        ) {

            newStatus =
                "rejected";
        }


        if (!newStatus) return;


        const rawId =
            orderCard
                .querySelector(
                    ".order-id"
                )
                .textContent;


        const orderId =
            rawId
                .replace("Order #", "")
                .trim();


        showLoading();


        try {

            const result =
                await fetchData({
                    INSTRUCTION:
                        "SET-ORDER-STATUS",

                    OrderID:
                        orderId,

                    status:
                        newStatus
                });


            if (
                result?.status === "OK"
            ) {

                showToast(
                    "fa-solid fa-check",
                    "Order Updated",
                    `Order has been ${newStatus}.`,
                    newStatus === "accepted"
                        ? "#1a8a00"
                        : "#e53935"
                );


                await getPlacedOrders();
            }

        } catch (error) {

            console.error(
                "Order update error:",
                error
            );


            showToast(
                "fa-solid fa-exclamation",
                "Update Failed",
                "Unable to update the order.",
                "#e53935"
            );

        } finally {

            hideLoading();
        }
    }
);


// ═══════════════════════════════════════════════════════════════
// ADD PRODUCT
// ═══════════════════════════════════════════════════════════════

Plus.addEventListener(
    "click",
    () => {

        showAddProduct();

        InsertCategories();
    }
);


// ── Cancel add product ────────────────────────────────────────

CancelNewProd.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            AddProduct.style.display =
                "none";
        }
    );
});


// ── Select product image ──────────────────────────────────────

cameraBtn.addEventListener(
    "click",
    () => {

        fileInput.click();
    }
);


fileInput.addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];


        if (!file) return;


        const reader =
            new FileReader();


        reader.onload = event => {

            prodImage.src =
                event.target.result;

            prodImage.style.display =
                "block";

            prodIcon.style.display =
                "none";

            cancelImgBtn.style.display =
                "flex";
        };


        reader.readAsDataURL(file);
    }
);


// ── Remove product image ──────────────────────────────────────

cancelImgBtn.addEventListener(
    "click",
    () => {

        prodImage.src = "";

        prodImage.style.display =
            "none";

        prodIcon.style.display =
            "flex";

        cancelImgBtn.style.display =
            "none";

        fileInput.value = "";
    }
);


// ═══════════════════════════════════════════════════════════════
// PRODUCT PRICE VALIDATION
// ═══════════════════════════════════════════════════════════════

function validatePrice(value) {

    const MAX_INTEGER =
        "9999999999999999";


    value =
        value.trim();


    if (
        !/^\d+(\.\d{1,2})?$/.test(value)
    ) {

        showToast(
            "fa-solid fa-money-bill",
            "Product Pricing",
            "Max 2 decimal places allowed.",
            "#e53935"
        );

        return false;
    }


    const integerPart =
        value.split(".")[0];


    if (
        integerPart.length >
        MAX_INTEGER.length
    ) {

        showToast(
            "fa-solid fa-money-bill",
            "Product Pricing",
            "The product price is too large.",
            "#e53935"
        );

        return false;
    }


    if (
        integerPart.length ===
        MAX_INTEGER.length &&
        integerPart >
        MAX_INTEGER
    ) {

        showToast(
            "fa-solid fa-money-bill",
            "Product Pricing",
            "The product price is too large.",
            "#e53935"
        );

        return false;
    }


    return true;
}


// ═══════════════════════════════════════════════════════════════
// SUBMIT NEW PRODUCT
// ═══════════════════════════════════════════════════════════════

AddNewProd.addEventListener(
    "click",
    async () => {

        const user =
            JSON.parse(
                localStorage.getItem(
                    "user"
                ) || "{}"
            );


        if (!user?.id) {

            showToast(
                "fa-solid fa-exclamation",
                "Not Logged In",
                "Please log in before adding a product.",
                "#e53935"
            );

            return;
        }


        const file =
            fileInput.files[0];


        const category =
            ProductCategory.dataset.value;


        if (
            !file ||
            !ProdName.value.trim() ||
            !ProdPrice.value.trim() ||
            !category ||
            !ProdDisc.value.trim()
        ) {

            showToast(
                "fa-solid fa-keyboard",
                "Missing Fields",
                "Please fill all fields and select a category.",
                "#e53935"
            );

            return;
        }


        const price =
            ProdPrice.value.trim();


        if (!validatePrice(price)) {
            return;
        }


        const payload = {

            INSTRUCTION:
                "UPLOAD-NEW-PROD",

            owner:
                user.id,

            name:
                ProdName.value.trim(),

            price,

            Category:
                category,

            Description:
                ProdDisc.value.trim()
        };


        const formData =
            new FormData();


        formData.append(
            "file",
            file
        );


        formData.append(
            "Data",
            JSON.stringify(payload)
        );


        showLoading();


        try {

            const result =
                await UploadFileWithData(
                    formData
                );


            if (
                result?.status === "OK"
            ) {

                AddProduct.style.display =
                    "none";


                ProdName.value = "";
                ProdPrice.value = "";
                ProdDisc.value = "";


                fileInput.value = "";


                showToast(
                    "fa-solid fa-check",
                    "Product Added",
                    "Your product was uploaded successfully.",
                    "#1a8a00"
                );


                await getMyProducts();

            } else if (
                result?.status ===
                "LIMIT_REACHED"
            ) {

                showToast(
                    "fa-solid fa-exclamation",
                    "Upload Limit Reached",
                    "You've reached the maximum number of products for this plan. Upgrade to add more.",
                    "#e53935"
                );

            } else {

                showToast(
                    "fa-solid fa-exclamation",
                    "Upload Failed",
                    result?.message ||
                    "Could not upload the product.",
                    "#e53935"
                );
            }

        } catch (error) {

            console.error(
                "Product upload error:",
                error
            );


            showToast(
                "fa-solid fa-exclamation",
                "Upload Failed",
                "Something went wrong. Please try again.",
                "#e53935"
            );

        } finally {

            hideLoading();
        }
    }
);


// ═══════════════════════════════════════════════════════════════
// EDIT PRODUCT
// ═══════════════════════════════════════════════════════════════

let currentEditId = null;


function openEditProduct(
    productId,
    productList
) {

    const product =
        productList.find(
            item =>
                item.Id === productId
        );


    if (!product) return;


    currentEditId =
        productId;


    EditProdImg.src =
        `${SERVER_URL}/products/${product.Url}`;


    EditProdName.value =
        product.name || "";


    EditProdPrice.value =
        product.price || "";


    EditProdCat.textContent =
        product.Category || "—";


    EditProdDisc.value =
        product.description || "";


    EditFileInput.value = "";


    EditProduct.style.display =
        "flex";
}


// ── Cancel edit ───────────────────────────────────────────────

CancelEdits.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            EditProduct.style.display =
                "none";

            currentEditId =
                null;
        }
    );
});


// ── Select new product image ──────────────────────────────────

SelectEditImg.addEventListener(
    "click",
    () => {

        EditFileInput.click();
    }
);


EditFileInput.addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];


        if (!file) return;


        const reader =
            new FileReader();


        reader.onload = event => {

            EditProdImg.src =
                event.target.result;
        };


        reader.readAsDataURL(file);
    }
);


// ── Cancel selected image ────────────────────────────────────

CancelEditImg.addEventListener(
    "click",
    () => {

        EditProdImg.src = "";

        EditFileInput.value = "";
    }
);


// ── Save product changes ──────────────────────────────────────

SaveEdit.addEventListener(
    "click",
    async () => {

        if (!currentEditId) return;


        const user =
            JSON.parse(
                localStorage.getItem(
                    "user"
                ) || "{}"
            );


        if (!user?.id) return;


        const payload = {

            INSTRUCTION:
                "UPDATE-PROD-DATA",

            ProdID:
                currentEditId,

            name:
                EditProdName.value.trim(),

            price:
                EditProdPrice.value.trim(),

            description:
                EditProdDisc.value.trim()
        };


        const file =
            EditFileInput.files[0];


        showLoading();


        try {

            let result;


            if (file) {

                const formData =
                    new FormData();


                formData.append(
                    "file",
                    file
                );


                formData.append(
                    "Data",
                    JSON.stringify(payload)
                );


                result =
                    await UploadFileWithData(
                        formData
                    );

            } else {

                result =
                    await fetchData(
                        payload
                    );
            }


            if (
                result?.status === "OK"
            ) {

                EditProduct.style.display =
                    "none";

                currentEditId =
                    null;


                showToast(
                    "fa-solid fa-check",
                    "Product Updated",
                    "Changes saved successfully.",
                    "#1a8a00"
                );


                await getMyProducts();

            } else {

                showToast(
                    "fa-solid fa-exclamation",
                    "Update Failed",
                    result?.message ||
                    "Could not save changes. Try again.",
                    "#e53935"
                );
            }

        } catch (error) {

            console.error(
                "Product update error:",
                error
            );


            showToast(
                "fa-solid fa-exclamation",
                "Update Failed",
                "Could not save changes. Try again.",
                "#e53935"
            );

        } finally {

            hideLoading();
        }
    }
);


// ═══════════════════════════════════════════════════════════════
// DELETE PRODUCT
// ═══════════════════════════════════════════════════════════════

async function deleteProduct(productId) {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            ) || "{}"
        );


    if (!user?.id) return;


    showLoading();


    try {

        const result =
            await fetchData({

                INSTRUCTION:
                    "DELETE-MY-PRODUCT",

                UserID:
                    user["User-ID"] ||
                    user.id,

                ProdID:
                    productId
            });


        if (
            result?.status === "OK"
        ) {

            showToast(
                "fa-solid fa-trash",
                "Deleted",
                "Product removed from your store.",
                "#e53935"
            );


            await getMyProducts();
        }

    } catch (error) {

        console.error(
            "Delete product error:",
            error
        );


        showToast(
            "fa-solid fa-exclamation",
            "Delete Failed",
            "Could not delete the product.",
            "#e53935"
        );

    } finally {

        hideLoading();
    }
}


// ═══════════════════════════════════════════════════════════════
// CATEGORIES
// ═══════════════════════════════════════════════════════════════

function saveLocalCategories(
    categories
) {

    try {

        localStorage.setItem(
            "Product-Categories",
            JSON.stringify(categories)
        );

    } catch (error) {

        console.warn(
            "Could not save categories locally:",
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

    } catch {

        return null;
    }
}


async function InsertCategories() {

    const selectWrapper =
        ProductCategory;


    const selectedDiv =
        selectWrapper.querySelector(
            ".selected"
        );


    const optionsContainer =
        selectWrapper.querySelector(
            ".options"
        );


    const stored =
        getLocalCategories();


    let categories = [];


    try {

        const data =
            await fetchData({
                INSTRUCTION:
                    "GET-CATEGORIES"
            });


        if (
            data &&
            Array.isArray(
                data.Product_Categories
            )
        ) {

            categories =
                data.Product_Categories;

            saveLocalCategories(
                categories
            );

        } else if (stored) {

            categories =
                stored;
        }

    } catch {

        if (stored) {
            categories =
                stored;
        }
    }


    categories =
        categories.filter(
            category =>
                category &&
                category !== "All"
        );


    if (!categories.length) {

        optionsContainer.innerHTML =
            `<div class="option">
                No categories available
            </div>`;

        return;
    }


    optionsContainer.innerHTML =
        "";


    categories.forEach(
        category => {

            const option =
                document.createElement(
                    "div"
                );


            option.classList.add(
                "option"
            );


            option.textContent =
                category;


            option.addEventListener(
                "click",
                () => {

                    selectedDiv.innerHTML = `
                        ${category}
                        <i class="fa-solid fa-chevron-down sel-arrow"></i>
                    `;


                    selectWrapper.dataset.value =
                        category;


                    optionsContainer.style.display =
                        "none";
                }
            );


            optionsContainer.appendChild(
                option
            );
        }
    );


    selectedDiv.onclick =
        event => {

            event.stopPropagation();


            optionsContainer.style.display =
                optionsContainer.style.display ===
                    "block"
                    ? "none"
                    : "block";
        };
}


// ── Close category menu ───────────────────────────────────────

document.addEventListener(
    "click",
    event => {

        if (
            ProductCategory &&
            !ProductCategory.contains(
                event.target
            )
        ) {

            const options =
                ProductCategory.querySelector(
                    ".options"
                );


            if (options) {
                options.style.display =
                    "none";
            }
        }
    }
);


// ═══════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════

Back?.addEventListener(
    "click",
    () => {

        window.history.back();
    }
);


// ── Dashboard ─────────────────────────────────────────────────

NavDash?.addEventListener(
    "click",
    () => {

        Dash();
    }
);


// ── Products ──────────────────────────────────────────────────

NavProducts?.addEventListener(
    "click",
    async () => {

        Profile.classList.remove(
            "active-profile"
        );


        if (
            ProductList.children.length === 0
        ) {

            await getMyProducts();

        } else {

            showProducts();
        }
    }
);


// ── Orders ────────────────────────────────────────────────────

NavOrders?.addEventListener(
    "click",
    async () => {

        Profile.classList.remove(
            "active-profile"
        );


        if (
            PlacedOrdersList.children.length ===
            0
        ) {

            await getPlacedOrders();

        } else {

            showOrders();
        }
    }
);


// ── Profile ───────────────────────────────────────────────────

Profile?.addEventListener(
    "click",
    () => {

        if (
            MyProfile.style.display ===
            "flex"
        ) {

            Profile.classList.remove(
                "active-profile"
            );


            NavProducts.click();

            return;
        }


        showMyProfile();

        loadAccountInfo();
    }
);


// ═══════════════════════════════════════════════════════════════
// ACCOUNT INFORMATION
// ═══════════════════════════════════════════════════════════════

async function loadAccountInfo() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            ) || "{}"
        );


    if (!user) return;


    DisplayAccountName.textContent =
        user["business-name"] ||
        "My Store";


    DisplayAccountId.textContent =
        user.id
            ? `ID: ${user.id}`
            : "";


    if (user.email) {

        DisplayOldEmail.textContent =
            user.email;
    }


    if (user.phone) {

        DisplayOldPhone.textContent =
            user.phone;
    }


    const countryFlag =
        document.querySelector(
            ".country-flag"
        );


    const countryName =
        document.querySelector(
            ".country-name"
        );


    const countryCurrency =
        document.querySelector(
            ".country-currency"
        );


    if (countryCurrency) {

        countryCurrency.textContent =
            user.currency || "";
    }


    if (
        countryFlag &&
        user.iso2
    ) {

        countryFlag.src =
            `https://flagcdn.com/w320/${user.iso2}.png`;
    }


    if (
        countryName &&
        user.country
    ) {

        countryName.textContent =
            user.country;
    }


    // ── Storefront link ───────────────────────────────────────

    if (
        CopyLink &&
        user.id
    ) {

        const storefrontURL =
            `${SERVER_URL}/retailer/${user.id}`;


        CopyLink.href =
            storefrontURL;


        CopyLink.textContent =
            storefrontURL;
    }


    // ═══════════════════════════════════════════════════════════
    // PROFILE IMAGE
    // ═══════════════════════════════════════════════════════════

    if (user.profilePic) {

        EditUserIcon.style.display =
            "none";


        DisplayProfileContainer.style.display =
            "flex";


        DisplayProfileImage.style.display =
            "block";


        DisplayProfileImage.src =
            `${SERVER_URL}/profile/${user.profilePic}`;

    } else {

        EditUserIcon.style.display =
            "flex";


        DisplayProfileContainer.style.display =
            "flex";


        DisplayProfileImage.style.display =
            "none";
    }


    // ── Always reset profile editing controls ─────────────────

    resetProfileEditing();


    // ── Hide phone editing controls ───────────────────────────

    UploadNewPhone.style.display =
        "none";


    CancelNewPhone.style.display =
        "none";


    const phoneContainer =
        NewPhoneInput?.closest(
            ".iti"
        );


    if (phoneContainer) {
        phoneContainer.style.display =
            "none";
    }
}


// ═══════════════════════════════════════════════════════════════
// PROFILE PHOTO EDITING
// ═══════════════════════════════════════════════════════════════


// ── Reset profile controls ────────────────────────────────────
//
// This puts the profile back into its normal state.
//
// NORMAL:
//     Edit Profile
//
// EDIT MODE:
//     Cancel | Upload | Camera
//
// ═══════════════════════════════════════════════════════════════

function resetProfileEditing() {

    if (EditOldProfile) {
        EditOldProfile.style.display =
            "inline-flex";
    }

    if (UploadNewImage) {
        UploadNewImage.style.display =
            "none";
    }

    if (CancelProfileUpdate) {
        CancelProfileUpdate.style.display =
            "none";
    }

    if (PickNewImage) {
        PickNewImage.style.display =
            "none";
    }

    if (NewImageInput) {
        NewImageInput.value = "";
    }
}


// ── Restore saved profile image ───────────────────────────────

function restoreSavedProfileImage() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            ) || "{}"
        );


    if (user?.profilePic) {

        const imageURL =
            `${SERVER_URL}/profile/${user.profilePic}`;


        if (DisplayProfileImage) {

            DisplayProfileImage.src =
                imageURL;

            DisplayProfileImage.style.display =
                "block";
        }


        if (EditUserIcon) {

            EditUserIcon.style.display =
                "none";
        }


        if (DisplayProfileContainer) {

            DisplayProfileContainer.style.display =
                "flex";
        }


        if (ProfileImg) {

            ProfileImg.src =
                imageURL;
        }


        if (businessLogo) {

            businessLogo.src =
                imageURL;
        }

    } else {

        if (DisplayProfileImage) {

            DisplayProfileImage.src =
                "";

            DisplayProfileImage.style.display =
                "none";
        }


        if (EditUserIcon) {

            EditUserIcon.style.display =
                "flex";
        }


        if (DisplayProfileContainer) {

            DisplayProfileContainer.style.display =
                "flex";
        }
    }
}


// ═══════════════════════════════════════════════════════════════
// ENTER PROFILE EDIT MODE
// ═══════════════════════════════════════════════════════════════

EditOldProfile?.addEventListener(
    "click",
    () => {

        // Hide Edit Profile
        EditOldProfile.style.display =
            "none";


        // Show Cancel
        CancelProfileUpdate.style.display =
            "inline-flex";


        // Show Upload
        UploadNewImage.style.display =
            "inline-flex";


        // Show Camera
        PickNewImage.style.display =
            "inline-flex";
    }
);


// ═══════════════════════════════════════════════════════════════
// CAMERA / IMAGE PICKER
// ═══════════════════════════════════════════════════════════════

PickNewImage?.addEventListener(
    "click",
    () => {

        if (!NewImageInput) return;

        NewImageInput.click();
    }
);


// ═══════════════════════════════════════════════════════════════
// IMAGE SELECTED
// ═══════════════════════════════════════════════════════════════

NewImageInput?.addEventListener(
    "change",
    event => {

        const file =
            event.target.files?.[0];


        if (!file) return;


        // ── Validate file type ─────────────────────────────────

        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            showToast(
                "fa-solid fa-image",
                "Invalid Image",
                "Please select a valid image file.",
                "#e53935"
            );


            NewImageInput.value =
                "";


            return;
        }


        // ── Preview selected image ─────────────────────────────

        const reader =
            new FileReader();


        reader.onload =
            readerEvent => {

                DisplayProfileImage.src =
                    readerEvent.target.result;


                DisplayProfileImage.style.display =
                    "block";


                EditUserIcon.style.display =
                    "none";


                DisplayProfileContainer.style.display =
                    "flex";
            };


        reader.readAsDataURL(file);
    }
);


// ═══════════════════════════════════════════════════════════════
// UPLOAD PROFILE IMAGE
// ═══════════════════════════════════════════════════════════════

UploadNewImage?.addEventListener(
    "click",
    async () => {

        const user =
            JSON.parse(
                localStorage.getItem(
                    "user"
                ) || "{}"
            );


        const file =
            NewImageInput?.files?.[0];


        // ── Validate user ──────────────────────────────────────

        if (!user?.id) {

            showToast(
                "fa-solid fa-exclamation",
                "Not Logged In",
                "Your account information could not be found.",
                "#e53935"
            );


            return;
        }


        // ── Validate image ─────────────────────────────────────

        if (!file) {

            showToast(
                "fa-solid fa-image",
                "No Image Selected",
                "Please select an image before uploading.",
                "#e53935"
            );


            return;
        }


        // ── Create multipart request ───────────────────────────

        const formData =
            new FormData();


        formData.append(
            "file",
            file
        );


        formData.append(
            "Data",
            JSON.stringify({

                INSTRUCTION:
                    "UPDATE-PROFILE-PIC",

                UserID:
                    user.id
            })
        );


        showLoading();


        try {

            const result =
                await UploadFileWithData(
                    formData
                );


            // ── Server rejected upload ─────────────────────────

            if (
                result?.status !== "OK"
            ) {

                showToast(
                    "fa-solid fa-exclamation",
                    "Upload Failed",
                    result?.message ||
                    "Could not update your profile photo.",
                    "#e53935"
                );


                return;
            }


            // ── Get returned filename ───────────────────────────

            const profilePic =
                result.profilePic ||
                result.url;


            if (!profilePic) {

                showToast(
                    "fa-solid fa-exclamation",
                    "Upload Error",
                    "The server uploaded the image but did not return its filename.",
                    "#e53935"
                );


                return;
            }


            // ═══════════════════════════════════════════════════
            // SAVE NEW PROFILE IMAGE
            // ═══════════════════════════════════════════════════

            user.profilePic =
                profilePic;


            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            const imageURL =
                `${SERVER_URL}/profile/${profilePic}`;


            // ── Update account profile image ────────────────────

            if (DisplayProfileImage) {

                DisplayProfileImage.src =
                    imageURL;

                DisplayProfileImage.style.display =
                    "block";
            }


            if (ProfileImg) {

                ProfileImg.src =
                    imageURL;
            }


            if (businessLogo) {

                businessLogo.src =
                    imageURL;
            }


            // ═══════════════════════════════════════════════════
            // RETURN TO NORMAL PROFILE STATE
            // ═══════════════════════════════════════════════════

            if (EditOldProfile) {

                EditOldProfile.style.display =
                    "inline-flex";
            }


            if (UploadNewImage) {

                UploadNewImage.style.display =
                    "none";
            }


            if (CancelProfileUpdate) {

                CancelProfileUpdate.style.display =
                    "none";
            }


            if (PickNewImage) {

                PickNewImage.style.display =
                    "none";
            }


            if (NewImageInput) {

                NewImageInput.value =
                    "";
            }


            SetProfile();


            showToast(
                "fa-solid fa-check",
                "Photo Updated",
                "Your profile photo was updated.",
                "#1a8a00"
            );

        } catch (error) {

            console.error(
                "Profile image upload error:",
                error
            );


            showToast(
                "fa-solid fa-exclamation",
                "Upload Failed",
                "Could not update your photo.",
                "#e53935"
            );

        } finally {

            hideLoading();
        }
    }
);


// ═══════════════════════════════════════════════════════════════
// CANCEL PROFILE IMAGE EDIT
// ═══════════════════════════════════════════════════════════════

CancelProfileUpdate?.addEventListener(
    "click",
    () => {

        // ── Remove selected file ───────────────────────────────

        if (NewImageInput) {

            NewImageInput.value =
                "";
        }


        // ── Restore the actual saved image ─────────────────────

        restoreSavedProfileImage();


        // ── Return to normal state ─────────────────────────────

        resetProfileEditing();
    }
);


// ═══════════════════════════════════════════════════════════════
// PHONE NUMBER
// ═══════════════════════════════════════════════════════════════

const iti =
    window.intlTelInput(
        NewPhoneInput,
        {

            initialCountry: "auto",


            geoIpLookup(success) {

                fetch(
                    "https://ipinfo.io"
                )

                    .then(
                        response => {

                            if (!response.ok) {

                                throw new Error(
                                    "IP lookup failed"
                                );
                            }


                            return response.json();
                        }
                    )

                    .then(
                        data => {

                            success(
                                data.country
                                    ?.toLowerCase() ||
                                "gh"
                            );
                        }
                    )

                    .catch(
                        () => {

                            success(
                                "gh"
                            );
                        }
                    );
            },


            separateDialCode:
                true,


            useFullscreenPopup:
                false,


            utilsScript:
                "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.5/build/js/utils.js"
        }
    );


// ── Edit phone ────────────────────────────────────────────────

EditOldPhone?.addEventListener(
    "click",
    () => {

        DisplayOldPhone.style.display =
            "none";


        const itiContainer =
            NewPhoneInput.closest(
                ".iti"
            );


        if (itiContainer) {

            itiContainer.style.display =
                "block";
        }


        NewPhoneInput.style.display =
            "block";


        UploadNewPhone.style.display =
            "inline-flex";


        CancelNewPhone.style.display =
            "inline-flex";


        EditOldPhone.style.display =
            "none";


        NewPhoneInput.focus();
    }
);


// ── Upload phone ──────────────────────────────────────────────

UploadNewPhone?.addEventListener(
    "click",
    async () => {

        const user =
            JSON.parse(
                localStorage.getItem(
                    "user"
                ) || "{}"
            );


        const phone =
            iti.getNumber();


        if (
            !user?.id ||
            !phone
        ) {
            return;
        }


        showLoading();


        try {

            const result =
                await fetchData({

                    INSTRUCTION:
                        "UPDATE-MY-PHONE",

                    UserID:
                        user.id,

                    new_Phone:
                        phone
                });


            if (
                result?.status ===
                "OK"
            ) {

                user.phone =
                    result.New_Phone;


                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );


                DisplayOldPhone.textContent =
                    result.New_Phone;


                CancelNewPhone.click();


                showToast(
                    "fa-solid fa-check",
                    "Phone Updated",
                    "Your phone number was changed.",
                    "#1a8a00"
                );
            }

        } catch (error) {

            console.error(
                "Phone update error:",
                error
            );


            showToast(
                "fa-solid fa-exclamation",
                "Update Failed",
                "Could not update your phone number.",
                "#e53935"
            );

        } finally {

            hideLoading();
        }
    }
);


// ── Cancel phone update ───────────────────────────────────────

CancelNewPhone?.addEventListener(
    "click",
    () => {

        DisplayOldPhone.style.display =
            "block";


        NewPhoneInput.style.display =
            "none";


        const itiContainer =
            NewPhoneInput.closest(
                ".iti"
            );


        if (itiContainer) {

            itiContainer.style.display =
                "none";
        }


        UploadNewPhone.style.display =
            "none";


        CancelNewPhone.style.display =
            "none";


        EditOldPhone.style.display =
            "inline-flex";
    }
);


// ═══════════════════════════════════════════════════════════════
// COPY STOREFRONT LINK
// ═══════════════════════════════════════════════════════════════

CopyIcon?.addEventListener(
    "click",
    () => {

        const url =
            CopyLink?.href;


        if (
            !url ||
            url ===
            window.location.href + "#"
        ) {
            return;
        }


        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            navigator.clipboard
                .writeText(url)
                .then(
                    showCopySuccess
                )
                .catch(
                    () =>
                        fallbackCopy(
                            url
                        )
                );

        } else {

            fallbackCopy(url);
        }
    }
);


function fallbackCopy(text) {

    const textarea =
        document.createElement(
            "textarea"
        );


    textarea.value =
        text;


    textarea.style.position =
        "fixed";


    textarea.style.opacity =
        "0";


    document.body.appendChild(
        textarea
    );


    textarea.focus();
    textarea.select();


    try {

        if (
            document.execCommand(
                "copy"
            )
        ) {

            showCopySuccess();
        }

    } catch (error) {

        console.error(
            "Copy failed:",
            error
        );
    }


    document.body.removeChild(
        textarea
    );
}


function showCopySuccess() {

    CopyIcon.classList.replace(
        "fa-copy",
        "fa-check"
    );


    CopyIcon.style.color =
        "#1a8a00";


    setTimeout(
        () => {

            CopyIcon.classList.replace(
                "fa-check",
                "fa-copy"
            );


            CopyIcon.style.color =
                "";

        },
        2000
    );
}


// ═══════════════════════════════════════════════════════════════
// LOG OUT
// ═══════════════════════════════════════════════════════════════

LogOut?.addEventListener(
    "click",
    () => {

        localStorage.clear();


        window.location.href =
            "/auth/auth.html";
    }
);


// ═══════════════════════════════════════════════════════════════
// UPGRADE
// ═══════════════════════════════════════════════════════════════

Upgrade?.addEventListener(
    "click",
    () => {

        UpgradeOverlay.style.display =
            "flex";
    }
);


CancelUpgrade?.addEventListener(
    "click",
    () => {

        UpgradeOverlay.style.display =
            "none";
    }
);


// ═══════════════════════════════════════════════════════════════
// END OF MAIN.JS
// ═══════════════════════════════════════════════════════════════
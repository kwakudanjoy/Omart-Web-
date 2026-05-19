// ═══════════════════════════════════════
//  BICYCON — RETAILER APP  |  main.js
// ═══════════════════════════════════════

// ── CONFIG ──────────────────────────────
const ipAddress = "https://portable-deeply-kelly-parameters.trycloudflare.com";
//const ipAddress = "http://10.109.111.228:8080";
//const ipAddress = "http://localhost:8080";
const User = JSON.parse(localStorage.getItem("user") || "{}");

// ── ELEMENT REFS ─────────────────────────
const DashSection = document.querySelector(".dash-section");
const ProductSection = document.querySelector(".product-section");
const ProductList = document.querySelector(".product-list");
const NoProduct = document.querySelector(".no-product-section");
const ProductCount = document.querySelector(".product-count > p");
const Plus = document.querySelector(".plus");
const Back = document.querySelector(".back");
const MyProfile = document.querySelector(".my-profile");
const PlacedOrdersList = document.querySelector(".order-section");
const NoInternet = document.querySelector(".no-internet");
const NoFoundOrders = document.querySelector(".no-found-products");
const Loading = document.querySelector("#loading-overlay");
const Upgrade_Overlay = document.querySelector(".upgrade-overlay");
const Upgrade = document.querySelector(".upgrade-btn");
const LogOut = document.querySelector(".log-out > button");
const copyIcon = document.querySelector(".copy-icon");
const copyLink = document.querySelector(".copy-link");
const Store_Section = document.querySelector(".my-store");

// Nav tabs
const NavDash = document.querySelector(".nav-tab.dash");
const NavProducts = document.querySelector(".nav-tab.products");
const NavOrders = document.querySelector(".nav-tab.orders");
const Profile = document.querySelector(".nav-profile");
const NavStore = document.querySelector(".store");

// Profile nav display
const UserIcon = document.querySelector(".user-icon");
const Pro_Pic = document.querySelector(".pro-pic");
const ProfileImg = document.querySelector(".pro-pic > img");

// Toast
const toast = document.querySelector(".toast");
const toastIconI = document.querySelector(".toast-icon-i");
const toastHead = document.querySelector(".toast-header-text");
const toastText = document.querySelector(".toast-text");

// Add product form
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
const PordCart = AddProduct.querySelector(".custom-select");

// Edit product
const EdithProduct = document.querySelector(".edith-prod-overlay");
const EditProdImg = EdithProduct.querySelector(".prod-image-update");
const EditFileInput = EdithProduct.querySelector(".prod-image-edit-file-input");
const SelectEditImg = EdithProduct.querySelector(".select-image");
const CancelEditImg = EdithProduct.querySelector(".cancel-selected-image");
const EditProdName = EdithProduct.querySelector(".edith-prod-name");
const EditProdPrice = EdithProduct.querySelector(".edith-prod-price");
const EditProdCat = EdithProduct.querySelector(".edith-prod-category > p");
const EditProdDisc = EdithProduct.querySelector(".edith-prod-discription");
const SaveEdit = EdithProduct.querySelector(".save-edith");
const CancelEdits = EdithProduct.querySelectorAll(".cancel-edth");

// Profile editing
const Edit_User_Icon = document.querySelector(".edith-user-icon");
const Display_Profile_Contanner = document.querySelector(".profile-pic");
const Display_Profile_Image = document.querySelector(".profile-pic > img");
const PickNew_Image = document.querySelector(".select-new-profile");
const NewImage_Input = document.querySelector("#profile-file");
const Upload_New_Image = document.querySelector(".upload-new-profile");
const Edith_OldPro = document.querySelector(".edith-old-profile");
const Cancel_Profile_Update = document.querySelector(".cance-profile-update");
const Display_Account_Id = document.querySelector(".display-account-id");
const Display_Account_Name = document.querySelector(".display-account-name");
const Display_Old_Email = document.querySelector(".display-email");
const New_Email_Input = document.querySelector(".new-email-input");
const Upload_New_Email = document.querySelector(".upload-new-email");
const Edit_Old_Email = document.querySelector(".edith-old-email");
const Cancel_New_Email = document.querySelector(".cancel-email-update");
const Display_Old_Phone = document.querySelector(".display-phone");
const New_Phone_Input = document.querySelector(".new-phone-input");
const Upload_New_Phone = document.querySelector(".upload-new-phone");
const Edit_Old_Phone = document.querySelector(".edith-old-phone");
const Cancel_New_Phone = document.querySelector(".cancel-phone-update");


// ── INIT ─────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    toast.classList.add("hide");
    SetProfile();
    // Hide quick-action buttons by default
    Upload_New_Image.style.display = "none";
    Cancel_Profile_Update.style.display = "none";
});

window.addEventListener("load", () => {
    setTimeout(() => NavDash.click(), 0);
});


// ── PROFILE SETUP ────────────────────────
function SetProfile() {
    if (User && User.profilePic) {
        UserIcon.style.display = "none";
        Pro_Pic.style.display = "flex";
        ProfileImg.src = `${ipAddress}/profile/${User.profilePic}`;
    } else {
        UserIcon.style.display = "flex";
        Pro_Pic.style.display = "none";
    }
}


// ── DISPLAY HELPERS ──────────────────────
function showDash() {
    DashSection.style.display = "block"
    ProductSection.style.display = "none";
    ProductList.style.display = "none";
    MyProfile.style.display = "none";
    PlacedOrdersList.style.display = "none";
    Store_Section.style.display = "none";
    NoFoundOrders.style.display = "none";
    NoInternet.style.display = "none";
    Plus.style.display = "none";
    Profile.classList.remove("active-profile");
    NavDash.classList.add("active");
    NavProducts.classList.remove("active");
    NavOrders.classList.remove("active");
    NavStore.classList.remove("active");
}

function showProducts() {
    DashSection.style.display = "none";
    ProductSection.style.display = "flex";
    ProductList.style.display = "grid";
    Store_Section.style.display = "none";
    MyProfile.style.display = "none";
    PlacedOrdersList.style.display = "none";
    NoFoundOrders.style.display = "none";
    NoInternet.style.display = "none";
    Plus.style.display = "flex";
    NavDash.classList.remove("active");
    NavProducts.classList.add("active");
    NavOrders.classList.remove("active");
    NavStore.classList.remove("active");
}

function showNoProduct() {
    DashSection.style.display = "none";
    NoProduct.style.display = "block";
    ProductList.style.display = "none";
    ProductSection.style.display = "flex";
    MyProfile.style.display = "none";
    PlacedOrdersList.style.display = "none";
    NoFoundOrders.style.display = "none";
    NoInternet.style.display = "none";
    Plus.style.display = "flex";
}

function showAddProduct() {
    DashSection.style.display = "none";
    AddProduct.style.display = "flex";
    prodImage.src = "";
    prodImage.style.display = "none";
    prodIcon.style.display = "flex";
    cancelImgBtn.style.display = "none";
    fileInput.value = "";
}

function showMyProfile() {
    DashSection.style.display = "none";
    ProductSection.style.display = "none";
    MyProfile.style.display = "flex";
    PlacedOrdersList.style.display = "none";
    NoFoundOrders.style.display = "none";
    NoInternet.style.display = "none";
    Plus.style.display = "none";
    Store_Section.style.display = "none";
    Profile.classList.add("active-profile");
    NavProducts.classList.remove("active");
    NavOrders.classList.remove("active");
    NavDash.classList.remove("active");
    NavStore.classList.remove("active");
}

function showOrders() {
    DashSection.style.display = "none";
    ProductSection.style.display = "none";
    MyProfile.style.display = "none";
    PlacedOrdersList.style.display = "grid";
    Store_Section.style.display = "none";
    NoFoundOrders.style.display = "none";
    NoInternet.style.display = "none";
    Plus.style.display = "none";
    Profile.classList.remove("active-profile");
    NavDash.classList.remove("active");
    NavOrders.classList.add("active");
    NavProducts.classList.remove("active");
    NavStore.classList.remove("active");
}

function showStores() {
    DashSection.style.display = "none";
    ProductSection.style.display = "none";
    MyProfile.style.display = "none";
    PlacedOrdersList.style.display = "none";
    Store_Section.style.display = "flex";
    NoFoundOrders.style.display = "none";
    NoInternet.style.display = "none";
    Plus.style.display = "none";
    Profile.classList.remove("active-profile");
    NavDash.classList.remove("active");
    NavOrders.classList.remove("active");
    NavProducts.classList.remove("active");
    NavStore.classList.add("active");

}


// ── TOAST ────────────────────────────────
function showToast(iconClasses, header, text, iconColor) {
    toastIconI.className = "";
    iconClasses.split(" ").forEach(c => toastIconI.classList.add(c));
    toastIconI.style.color = iconColor;
    toastHead.textContent = header;
    toastText.textContent = text;

    toast.classList.remove("hide");
    setTimeout(() => toast.classList.add("show"), 50);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.classList.add("hide"), 300);
    }, 4500);
}

document.querySelector(".toast-close").addEventListener("click", () => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hide"), 300);
});


// ── FETCH HELPERS ────────────────────────
async function fetchData(payload) {
    try {
        const res = await fetch(`${ipAddress}/api/process`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!data) throw new Error("Empty response");
        return data;
    } catch (err) {
        console.error("fetchData:", err);
        Loading.style.display = "none";
        return null;
    }
}

async function UploadFileWithData(formData) {
    try {
        const res = await fetch(`${ipAddress}/api/file`, {
            method: "POST",
            body: formData
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        try { return JSON.parse(text); } catch { return text; }
    } catch (err) {
        console.error("UploadFileWithData:", err);
        throw err;
    }
}

// 1. Define the formatter once
const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

async function Dash() {
    const user = JSON.parse(localStorage.getItem("user")); // getting user data

    //Variables
    const PendingOrdersTab = DashSection.querySelector(".pending-tab"); //Pending tab Variable
    const PendingOrdersList = DashSection.querySelector(".pending-section");//Pending order List Variable
    const RejectedOrdersTabe = DashSection.querySelector(".rejected-tab");// Rejected tab variable
    const RejectedOrdersList = DashSection.querySelector(".rejected-section");//Rejected order List Variable
    DashSection.querySelector(".dash-card .currency-code").textContent = `${user["currecyCode"]}`;
    DashSection.querySelector(".actual-revenue .currency-code").textContent = `${user["currecyCode"]}`;
    const Graph = DashSection.querySelector(".graph-container");

    RejectedOrdersList.style.display = "none";

    PendingOrdersTab.onclick = () => {
        PendingOrdersTab.classList.add("active");
        PendingOrdersList.style.display = "flex";
        RejectedOrdersTabe.classList.remove("active");
        RejectedOrdersList.style.display = "none";
    }

    RejectedOrdersTabe.onclick = () => {
        PendingOrdersTab.classList.remove("active");
        PendingOrdersList.style.display = "none";
        RejectedOrdersTabe.classList.add("active");
        RejectedOrdersList.style.display = "flex";
    }

    PendingOrdersTab.click();

    //assigining Current Date 
    const nowDate = () => new Date().toISOString().split('T')[0];
    const FromDateInput = DashSection.querySelector(".from-date");
    const ToDateInput = DashSection.querySelector(".to-date");


    FromDateInput.value = nowDate();
    ToDateInput.value = nowDate();


    let getFromDate = null;
    let getToDate = null;

    const refreshBtn = DashSection.querySelector(".refresh");

    refreshBtn.onclick = async () => {
        // Get fresh values INSIDE the handler
        getFromDate = FromDateInput.value;
        getToDate = ToDateInput.value;

        if (new Date(getFromDate).getTime() > new Date(getToDate).getTime()) {
            showToast("fa-solid fa-exclamation", "Date Range", "The date range you selected is incorrect", "#e53935");
            return;
        }

        Get_Dash_Data();

    }

    // creating two fragments that will be used to append the children in the pending order list and Rejected order list
    const orderPendingFragment = document.createDocumentFragment();
    const orderRejectedFragment = document.createDocumentFragment();

    async function Get_Dash_Data() {

        //payload which caries the instruction which will be performed by the server
        let Payload = {
            INSTRUCTION: "GET-REVENUE-DATA",
            fromDate: getFromDate,
            toDate: getToDate,
            userid: user["User-ID"]
        }

        let EstimatedRevenue = 0;
        let ActualRevenue = 0;
        let PendingRevenue = 0;
        let AprovedRevenue = 0;
        let RejectedRevenue = 0;

        let ApprovedOrdersCount = 0;
        let PendingOrdersCount = 0;
        let RejectedOrdersCount = 0;


        refreshBtn.classList.add("refresh-spinning");
        let Result = await fetchData(Payload);

        if (Result) {

            refreshBtn.classList.remove("refresh-spinning");
            // Clear all lists exactly once before structural layout changes
            PendingOrdersList.innerHTML = "";
            RejectedOrdersList.innerHTML = "";
            Graph.innerHTML = "";

            // Safely extract currency code once to avoid object lookup thrashing
            const currency = user["currencyCode"] || "$";

            for (let key in Result) {
                let rows = Result[key];
                if (!Array.isArray(rows) || rows.length === 0) continue;

                const dateObj = new Date(key);
                const dayLabel = dateObj.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });

                let localEstimatedRevenue = 0;
                let localApproved = 0;
                let localPending = 0;
                let localRejected = 0;

                // Optional: If fragments are instantiated globally, ensure they clear per day loop
                // const orderPendingFragment = document.createDocumentFragment(); 
                // const orderRejectedFragment = document.createDocumentFragment();

                rows.forEach(row => {
                    let orderAmount = Number(row["orderTotal"]) || 0;
                    let orderStatus = row["orderStatus"];

                    localEstimatedRevenue += orderAmount;

                    if (orderStatus === "accepted") {
                        localApproved += orderAmount;
                        ApprovedOrdersCount++;
                    } else if (orderStatus === "Pending") {
                        localPending += orderAmount;
                        PendingOrdersCount++;

                        const orderPending = document.createElement("div");
                        orderPending.classList.add("list-card");
                        orderPending.innerHTML = `
                                <div class="left-info">
                                    <span class="list-number">${PendingOrdersCount}</span>
                                    <span class="list-order-id">#${row.orderID}</span>
                                </div>
                                <div class="right-info">
                                    <span class="status-badge status-pending">Pending</span>
                                    <button class="list-action">View order</button>
                                </div>`;
                        orderPendingFragment.appendChild(orderPending);
                    } else {
                        localRejected += orderAmount;
                        RejectedOrdersCount++;

                        const rejectedOrder = document.createElement("div");
                        rejectedOrder.classList.add("list-card");
                        rejectedOrder.innerHTML = `
                                <div class="left-info">
                                    <span class="list-number">${RejectedOrdersCount}</span>
                                    <span class="list-order-id">#${row.orderID}</span>
                                </div>
                                <div class="right-info">
                                    <span class="status-badge status-rejected">Rejected</span>
                                    <button class="list-action">View order</button>
                                </div>`;
                        orderRejectedFragment.appendChild(rejectedOrder);
                    }
                });

                // Flush out localized fragments to the UI tree structure safely
                PendingOrdersList.appendChild(orderPendingFragment);
                RejectedOrdersList.appendChild(orderRejectedFragment);

                // Calculate metrics aggregates
                EstimatedRevenue += localEstimatedRevenue;
                ActualRevenue += localApproved;
                PendingRevenue += localPending;
                RejectedRevenue += localRejected;

                // Render Charts Logic Layer
                if (localEstimatedRevenue > 0) {
                    const createBar = (amt, typeClass, label) => {
                        let percentage = (amt / localEstimatedRevenue) * 100 + "%";
                        return `
                                <div class="bar-wrapper">
                                    <div class="amount-tooltip">${currency} ${amt.toLocaleString()}</div>
                                    <div class="date-tooltip">${key}</div>
                                    <div class="parent-bar">
                                        <div class="inner-bar ${typeClass}" style="height: ${percentage};"></div>
                                    </div>
                                    <div class="day-label">${label}</div>
                                </div>`;
                    };

                    if (localApproved > 0) Graph.insertAdjacentHTML('beforeend', createBar(localApproved, "approved-bg", dayLabel));
                    if (localPending > 0) Graph.insertAdjacentHTML('beforeend', createBar(localPending, "pending-bg", dayLabel));
                    if (localRejected > 0) Graph.insertAdjacentHTML('beforeend', createBar(localRejected, "rejected-bg", dayLabel));
                }
            }
        } else {
            refreshBtn.classList.remove("refresh-spinning");
            showToast("fa-solid fa-exclamation", "Error", "An error occured while fetching dash dada, Please check your internet connection", "#e53935");
        }

        // Logic DRY Optimization: Update the metric node text properties once down here
        const currency = user["currecyCode"] || "$";

        DashSection.querySelector(".estimated-revenue .amount").textContent = `${currency} ${formatter.format(EstimatedRevenue)}`;
        DashSection.querySelector(".actual-revenue .amount").textContent = `${currency} ${formatter.format(ActualRevenue)}`;
        DashSection.querySelector(".pending-orders .amount").textContent = `${currency} ${formatter.format(PendingRevenue)}`;
        DashSection.querySelector(".rejected-orders .amount").textContent = `${currency} ${formatter.format(RejectedRevenue)}`;

        // Corrected format logic engine for string representations of counts
        const countFormatter = new Intl.NumberFormat();
        DashSection.querySelector(".pending-orders .order-count").textContent = `${countFormatter.format(PendingOrdersCount)} Orders`;
        DashSection.querySelector(".rejected-orders .order-count").textContent = `${countFormatter.format(RejectedOrdersCount)} Orders`;
    }

    if (refreshBtn) {
        refreshBtn.click();
    }


    //Method for mapping the card order to the order card
    async function findOrder(selectedOrderid) {

        let placedOrders = document.querySelectorAll(".order-section .order-cart");
        if (placedOrders.length === 0) {

            try {
                const orderList = await fetchData({ INSTRUCTION: "GET-MY-ORDERS", User_id: user["User-ID"] });

                insertOrdersCard(orderList, user["currecyCode"]);

                placedOrders = document.querySelectorAll(".order-section .order-cart");
                placedOrders.forEach(orderCard => {
                    let targetedOrderId = orderCard.querySelector(".order-id").textContent.split("Order ")[1].trim();
                    if (targetedOrderId === selectedOrderid) {

                        orderCard.classList.add("active");
                        setTimeout(() => orderCard.classList.remove("active"), 3000);
                        showOrders();
                        orderCard.scrollIntoView({
                            behavior: "smooth", block: "center"
                        });
                    }
                });

            } catch (err) {

            }

        } else {
            placedOrders.forEach(orderCard => {
                let targetedOrderId = orderCard.querySelector(".order-id").textContent.split("Order ")[1].trim();
                if (targetedOrderId === selectedOrderid) {

                    orderCard.classList.add("active");
                    setTimeout(() => orderCard.classList.remove("active"), 3000);
                    showOrders();
                    orderCard.scrollIntoView({
                        behavior: "smooth", block: "center"
                    });
                }
            });
        }

    }

    PendingOrdersList.onclick = async (e) => {
        if (e.target.closest(".list-action")) {
            const PendingOrder = e.target.closest(".list-card");
            let selectedOrderid = PendingOrder.querySelector(".list-order-id").textContent.trim();

            findOrder(selectedOrderid); // maps the user to the order card
        }
    }

    RejectedOrdersList.onclick = async (e) => {
        if (e.target.closest(".list-action")) {

            const RejectedOrder = e.target.closest(".list-card");
            let selectedOrderid = RejectedOrder.querySelector(".list-order-id").textContent.trim();

            findOrder(selectedOrderid); // maps the user to the order card
        }
    }

    showDash();
}

// ── GET PRODUCTS ─────────────────────────
async function getMyProducts() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user["User-ID"]) return showNoProduct();

    Loading.style.display = "flex";
    const list = await fetchData({ INSTRUCTION: "GET-MY-PRODUCTS", User_id: user["User-ID"] });
    Loading.style.display = "none";

    if (!Array.isArray(list) || list.length === 0) return showNoProduct();

    ProductList.innerHTML = "";
    NoProduct.style.display = "none";
    const frag = document.createDocumentFragment();
    let count = 0;

    list.forEach(prod => {
        const card = document.createElement("div");
        card.classList.add("list-card");
        card.innerHTML = `
      <img src="${ipAddress}/products/${prod.Url}" alt="${prod.name}" class="prod-img" loading="lazy"/>
      <div class="card-body">
        <p class="pord-name">${prod.name}</p>
        <p class="prod-price">${prod.currencyCode} ${formatter.format(prod.price)}</p>
        <p class="prod-id">${prod.Id}</p>
        <p class="final-prod-description">${prod.description}</p>
      </div>
      <div class="edith-delete-prod">
        <div class="edith-prod" data-id="${prod.Id}"><i class="fa-solid fa-pen"></i> Edit</div>
        <div class="delete-prod" data-id="${prod.Id}"><i class="fa-solid fa-trash"></i> Delete</div>
      </div>
      <p class="posted-at">Posted ${prod.postedAt}</p>
    `;
        frag.appendChild(card);
        count++;
    });

    ProductList.appendChild(frag);
    ProductCount.textContent = count;
    showProducts();

    // Wire up edit/delete buttons
    ProductList.querySelectorAll(".edith-prod").forEach(btn => {
        btn.addEventListener("click", () => openEditProduct(btn.dataset.id, list));
    });

    ProductList.querySelectorAll(".delete-prod").forEach(btn => {
        btn.addEventListener("click", () => deleteProduct(btn.dataset.id));
    });
}


// ── GET ORDERS ───────────────────────────
async function getPlacedOrders() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user["User-ID"]) return;

    Loading.style.display = "flex";
    const orderList = await fetchData({ INSTRUCTION: "GET-MY-ORDERS", User_id: user["User-ID"] });
    Loading.style.display = "none";

    if (!Array.isArray(orderList)) {
        ProductSection.style.display = "none";
        MyProfile.style.display = "none";
        PlacedOrdersList.style.display = "none";
        NoInternet.style.display = "flex";
        return;
    }

    if (orderList.length === 0) {
        DashSection.style.display = "none";
        ProductSection.style.display = "none";
        MyProfile.style.display = "none";
        PlacedOrdersList.style.display = "none";
        Store_Section.style.display = "none";
        NoFoundOrders.style.display = "flex";
        return;
    }

    insertOrdersCard(orderList, user["currecyCode"]);
    showOrders();
}

//This method is used to insert all orders into the orders tab
function insertOrdersCard(orderList, currencyCode) {

    PlacedOrdersList.innerHTML = "";
    const frag = document.createDocumentFragment();

    orderList.forEach(ord => {
        const status = (ord.status || "").toLowerCase().trim();
        const card = document.createElement("div");
        card.classList.add("order-cart");
        card.innerHTML = `
            <div class="order-header">
                <span class="order-index">#${ord.index}</span>
                <span class="order-id">Order #${ord.orderId}</span>
                <span class="order-date">${ord.date}</span>
                <span class="order-time">${ord.time}</span>
            </div>
            <div class="product-info">
                <h4 class="product-name">${ord.productName}</h4>
                <span class="product-id">Product ID: #${ord.productId}</span>
            </div>
            <div class="customer-phone">
                <span class="phone">${ord.customerPhone}</span>
                <div class="phone-icon"><i class="fa-solid fa-phone"></i></div>
            </div>
            <div class="order-details">
                <div class="detail"><span>Quantity</span><strong>${formatter.format(ord.quantity)}</strong></div>
                <div class="detail"><span>Price</span><strong>${currencyCode} ${formatter.format(ord.amountPerProduct)}</strong></div>
                <div class="detail total"><span>Total</span><strong>${currencyCode} ${formatter.format(ord.totalAmount)}</strong></div>
            </div>
            <div class="order-cart-actions">
                <button class="accept-btn" type="button"><i class="fa-solid fa-check"></i> Accept</button>
                <button class="reject-btn" type="button"><i class="fa-solid fa-x"></i> Reject</button>
            </div>
            <div class="order-cart-status">
                <span class="status accepted">Accepted ✓</span>
                <span class="status rejected">Rejected ✗</span>
            </div>
            `;

        const actions = card.querySelector(".order-cart-actions");
        const statusBox = card.querySelector(".order-cart-status");
        const accepted = card.querySelector(".status.accepted");
        const rejected = card.querySelector(".status.rejected");

        actions.style.display = "none";
        statusBox.style.display = "none";
        accepted.style.display = "none";
        rejected.style.display = "none";

        if (status === "pending") {
            actions.style.display = "flex";
        } else if (status === "accepted") {
            statusBox.style.display = "block";
            accepted.style.display = "inline-block";
        } else if (status === "rejected") {
            statusBox.style.display = "block";
            rejected.style.display = "inline-block";
        }

        frag.appendChild(card);
    });

    PlacedOrdersList.appendChild(frag);

}

// Order actions (accept / reject / call)
PlacedOrdersList.addEventListener("click", async e => {
    const item = e.target.closest(".order-cart");
    if (!item) return;

    if (e.target.closest(".phone-icon")) {
        const phone = item.querySelector(".phone").textContent.trim();
        window.location.href = `tel:${phone}`;
        return;
    }

    const rawId = item.querySelector(".order-id").textContent;
    const orderId = rawId.replace("Order #", "").trim();

    let newStatus = null;
    if (e.target.closest(".accept-btn")) newStatus = "accepted";
    if (e.target.closest(".reject-btn")) newStatus = "rejected";
    if (!newStatus) return;

    Loading.style.display = "flex";
    const result = await fetchData({ INSTRUCTION: "SET-ORDER-STATUS", OrderID: orderId, status: newStatus });
    Loading.style.display = "none";

    if (result && result.status === "OK") {
        showToast("fa-solid fa-check", "Order Updated", `Order has been ${newStatus}.`, newStatus === "accepted" ? "#1a8a00" : "#e53935");
        getPlacedOrders();
    }
});


// ============== code for stores activities ==========
NavStore.addEventListener("click", () => {

    //GETTING USER INFO
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user["User-ID"]) return;

    const Add_Store_Overlay = Store_Section.querySelector(".add-store-overlay");
    const Add_Store_Password_Overlay = Store_Section.querySelector(".add-store-password-overlay");
    const Stores = Store_Section.querySelector(".stores");
    const CardContainer = Store_Section.querySelector(".store-container");
    const Edith_Store_Overlay = Store_Section.querySelector(".edith-store-overlay");
    Edith_Store_Overlay.classList.add("active");

    //Inputs Variable
    const StoreName = Store_Section.querySelector(".store-name");
    const StoreEmail = Store_Section.querySelector(".store-email");
    const StorePhone = Store_Section.querySelector(".store-phone");
    const StoreLocation = Store_Section.querySelector(".store-location");
    const StorePassword = Store_Section.querySelector(".store-password");
    const StoreConfrimPassword = Store_Section.querySelector(".store-confirm-password");
    const PickLocation = Store_Section.querySelector(".pick-location-btn");
    const NoStores = Store_Section.querySelector(".no-store");
    const NoInternet = Store_Section.querySelector(".no-internet");
    const StoreCountView = Store_Section.querySelector(".store-count > p");
    const count = Store_Section.querySelector(".store-count");

    //Store Count;
    let StoreCount = 0;

    //setting both the noInternet and Stores to display none
    NoStores.style.display = "none";
    NoInternet.style.disabled = "none";

    //fragment for inserting card to view
    const fragment = document.createDocumentFragment();

    //setting country icon selector on the phone input 
    const iti = window.intlTelInput(StorePhone, {
        initialCountry: "auto",
        geoIpLookup: cb => fetch("https://ipapi.co/json/").then(r => r.json()).then(d => cb(d.country_code)).catch(() => cb("gh")),
        separateDialCode: true,
        useFullscreenPopup: false,
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.5/build/js/utils.js"
    });


    //getting All stores
    async function getAllStores() {
        CardContainer.innerHTML = "";
        let Payload = {
            INSTRUCTION: "GET-MY-STORES",
            owner: user["User-ID"]
        }

        Loading.style.display = "flex";
        let Result = await fetchData(Payload);


        if (!Array.isArray(Result)) {
            Loading.style.display = "none";
            Stores.style.display = "none";
            NoInternet.style.display = "block";

            return;
        }

        if (Result.length === 0) {
            Loading.style.display = "none";
            Stores.style.display = "flex";
            CardContainer.style.display = "none";
            NoStores.style.display = "block";
            return;
        }

        Loading.style.display = "none";
        StoreCount = 0
        Result.forEach(store => {
            
            StoreCount++;
            StoreCountView.textContent = StoreCount;

            const storeCard = document.createElement("div");
            storeCard.classList.add("store-card");
            storeCard.innerHTML =
                `
                <button class="delete-btn">
                    <i class="fa-solid fa-trash"></i>
                </button>
                <div class="store-data-top">
                    <div class="store-data-info">
                        <h2>${store.name}</h2>
                        <span class="storeid">
                            StoreId : ${store.id}
                        </span>
                        <span>
                            <i class="fa-solid fa-user"></i>
                            ${store.name}
                        </span>
                        <span>
                            <i class="fa-solid fa-envelope"></i>
                            ${store.email}
                        </span>
                        <span>
                            <i class="fa-solid fa-phone"></i>
                            ${store.phone}
                        </span>
                        <span>
                            <i class="fa-solid fa-location-dot"></i>
                            ${store.location}
                        </span>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="view-btn">
                        <i class="fa-solid fa-store"></i>
                        View Store
                    </button>
                    <button class="edit-btn">
                        <i class="fa-solid fa-pen"></i>
                        Edit Data
                    </button>
                </div>
            `

            fragment.append(storeCard);

        });

        CardContainer.append(fragment);

    }

    //Next and upload buttons 
    Store_Section.querySelector(".add-store").onclick = () => {
        Add_Store_Overlay.classList.add("active");
        StoreName.value = "";
        StoreEmail.value = "";
        StorePhone.value = "";
        StoreLocation.value = "";


        //Onclick funct for the next button in the create store overlay 
        Add_Store_Overlay.querySelector(".next>button").onclick = () => {
            if (StoreName.value.trim() === "" || StoreEmail.value.trim() === "" || StorePhone.value.trim() === "" || StoreLocation.value.trim() === "") {
                showToast(
                    "fa-solid fa-keyboard",
                    "Required Inputs",
                    "All inputs are required to proceed",
                    "red");
                return;
            }

            if (!iti.isValidNumber()) {
                showToast(
                    "fa-solid fa-phone",
                    "Invalid Number",
                    "The number you entered is invalid",
                    "red");

                return;
            }

            Add_Store_Overlay.classList.remove("active");
            Add_Store_Password_Overlay.classList.add("active");

            StorePassword.value = "";
            StoreConfrimPassword.value = "";


            //inclick fuction on the upload button in the create password overlay when creating a new store
            Add_Store_Password_Overlay.querySelector(".upload").onclick = async () => {
                if (StorePassword.value.trim() === "" || StoreConfrimPassword.value.trim() === "") {
                    showToast(
                        "fa-solid fa-keyboard",
                        "Required Inputs",
                        "All inputs are required to proceed",
                        "red");
                    return;
                }

                if (StorePassword.value.trim() !== StoreConfrimPassword.value.trim()) {
                    StoreConfrimPassword.style.boxShadow = "0 0 10px red";
                    StorePassword.style.boxShadow = "0 0 10px red";
                    return;
                }


                let Payload = {
                    INSTRUCTION: "INSERT-NEW-STORE",
                    owner: user["User-ID"],
                    name: StoreName.value.trim(),
                    email: StoreEmail.value.trim(),
                    phone: iti.getNumber(),
                    location: StoreLocation.value.trim(),
                    password: StorePassword.value.trim()
                }

                

                Loading.style.display = "flex";
                let Responce = await fetchData(Payload);
                Loading.style.display = "none";


                if (Responce && Responce.status === "OK") {
                    Add_Store_Password_Overlay.style.display = "none";
                    NoStores.style.display = "none";
                    CardContainer.style.display = "grid";
                    showToast(
                        "fa-solid fa-check",
                        "Added Store",
                        "Your new store has been added successfully",
                        "green");

                    getAllStores();
                }

            }

            //onclick on the close button to close the create store password overlay
            Add_Store_Password_Overlay.querySelector(".close-btn-add-password").onclick = () => {
                Add_Store_Overlay.classList.add("active");
                Add_Store_Password_Overlay.classList.remove("active");
            }
        };


        //onclick on cancel buttons to close the add store overlay
        Add_Store_Overlay.querySelector(".close-btn-add-store").onclick = () => {
            Add_Store_Overlay.classList.remove("active");
        }
    };

    //onclikc for editing store data
    CardContainer.onclick = (e) =>{
        const store_Card = e.target.closest(".store-card");
        let StoreID = null;
        if(e.target.closest(".delete-btn")){
            StoreID = store_Card.querySelector(".storeid").textContent.split("StoreId : ")[1];
            alert(StoreID);

        }else if(e.target.closest(".view-btn")){
            
        }else if(e.target.closest(".edit-btn")){

        }
    }


    //PickLocation Algorithem
    PickLocation.onclick = () => {

        PickLocation.disabled = true;
        PickLocation.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;

        navigator.geolocation.getCurrentPosition(
            (position) => {

                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                StoreLocation.value = `${lat}, ${lng}`;

                PickLocation.disabled = false;
                PickLocation.innerHTML = `<i class="fa-solid fa-crosshairs"></i>`;

            },
            () => {

                PickLocation.disabled = false;
                PickLocation.innerHTML = `<i class="fa-solid fa-crosshairs"></i>`;

                showToast(
                    "fa-solid fa-exclamation",
                    "Pick Location Error",
                    "Unable to pick current location",
                    "red"
                );
            }
        );
    };

    if (CardContainer.children.length === 0) {
        getAllStores();
    } else {
        CardContainer.style.display = "grid";
    }

    showStores();
});


// ── ADD PRODUCT ──────────────────────────
Plus.addEventListener("click", () => {
    showAddProduct();
    Insert_Categories();
});

// Cancel buttons on add form
CancelNewProd.forEach(btn => btn.addEventListener("click", () => {
    AddProduct.style.display = "none";
}));

// Image pick
cameraBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
        prodImage.src = evt.target.result;
        prodImage.style.display = "block";
        prodIcon.style.display = "none";
        cancelImgBtn.style.display = "flex";
    };
    reader.readAsDataURL(file);
});

cancelImgBtn.addEventListener("click", () => {
    prodImage.src = "";
    prodImage.style.display = "none";
    prodIcon.style.display = "flex";
    cancelImgBtn.style.display = "none";
    fileInput.value = "";
});

AddNewProd.addEventListener("click", async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Not logged in!");

    const file = fileInput.files[0];
    const value = PordCart.dataset.value;

    if (!file || !ProdName.value.trim() || !ProdPrice.value.trim() || !value || !ProdDisc.value.trim()) {
        showToast("fa-solid fa-keyboard", "Missing Fields", "Please fill all fields and select a category.", "#e53935");
        return;
    }

    const payload = {
        INSTRUCTION: "UPLOAD-NEW-PROD",
        owner: user["User-ID"],
        name: ProdName.value.trim(),
        price: ProdPrice.value.trim(),
        Category: value,
        Description: ProdDisc.value.trim()
    };


    const formData = new FormData();
    formData.append("file", file);
    formData.append("Data", JSON.stringify(payload));

    try {
        Loading.style.display = "flex";
        const result = await UploadFileWithData(formData);
        Loading.style.display = "none";

        if (result && result.status === "OK") {
            AddProduct.style.display = "none";
            ProdName.value = "";
            ProdPrice.value = "";
            ProdDisc.value = "";
            fileInput.value = "";
            //cancelImgBtn.click();
            showToast("fa-solid fa-check", "Product Added", "Your product was uploaded successfully.", "#1a8a00");
            getMyProducts();
        } else if (result && result.status === "LIMIT_REACHED") {
            showToast("fa-solid fa-exclamation", "Upload Limit reached", "You’ve reached the maximum number of products for this plan. Upgrade to add more.", "#e53935");

        }
    } catch {
        Loading.style.display = "none";
        showToast("fa-solid fa-exclamation", "Upload Failed", "Something went wrong. Please try again.", "#e53935");
    }
});


// ── EDIT PRODUCT ─────────────────────────
let currentEditId = null;

function openEditProduct(prodId, list) {
    const prod = list.find(p => p.Id === prodId);
    if (!prod) return;
    currentEditId = prodId;
    EditProdImg.src = `${ipAddress}/products/${prod.Url}`;
    EditProdName.value = prod.name;
    EditProdPrice.value = prod.price;
    EditProdCat.textContent = prod.Category || "—";
    EditProdDisc.value = prod.description;
    EdithProduct.style.display = "flex";
}

CancelEdits.forEach(btn => btn.addEventListener("click", () => {
    EdithProduct.style.display = "none";
}));

SelectEditImg.addEventListener("click", () => EditFileInput.click());

EditFileInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = evt => {
        EditProdImg.src = evt.target.result;
        //CancelEditImg.style.display = "flex";
        //SelectEditImg.style.display = "flex";
    };
    reader.readAsDataURL(file);
});

CancelEditImg.addEventListener("click", () => {
    EditProdImg.src = "";
    EditFileInput.value = "";
    // SelectEditImg.style.display = "flex";
});

SaveEdit.addEventListener("click", async () => {
    if (!currentEditId) return;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const payload = {
        INSTRUCTION: "UPDATE-PROD-DATA",
        ProdID: currentEditId,
        name: EditProdName.value.trim(),
        price: EditProdPrice.value.trim(),
        description: EditProdDisc.value.trim()
    };

    const file = EditFileInput.files[0];
    Loading.style.display = "flex";

    let result;

    if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("Data", JSON.stringify(payload));
        result = await UploadFileWithData(formData);
    } else {
        result = await fetchData(payload);
    }

    Loading.style.display = "none";

    if (result && result.status === "OK") {
        EdithProduct.style.display = "none";
        showToast("fa-solid fa-check", "Product Updated", "Changes saved successfully.", "#1a8a00");
        getMyProducts();
    } else {
        showToast("fa-solid fa-exclamation", "Update Failed", "Could not save changes. Try again.", "#e53935");
    }
});


// ── DELETE PRODUCT ───────────────────────
async function deleteProduct(prodId) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    Loading.style.display = "flex";
    const result = await fetchData({ INSTRUCTION: "DELETE-PRODUCT", UserID: user["User-ID"], ProdID: prodId });
    Loading.style.display = "none";

    if (result && result.status === "OK") {
        showToast("fa-solid fa-trash", "Deleted", "Product removed from your store.", "#e53935");
        getMyProducts();
    }
}


// ── CATEGORIES ───────────────────────────
function saveLocalCategories(cats) {
    try { localStorage.setItem("Product-Categories", JSON.stringify(cats)); } catch { }
}
function getLocalCategories() {
    try {
        const s = localStorage.getItem("Product-Categories");
        return s ? JSON.parse(s) : null;
    } catch { return null; }
}

async function Insert_Categories() {
    const selectWrapper = PordCart;
    const selectedDiv = selectWrapper.querySelector(".selected");
    const optionsContainer = selectWrapper.querySelector(".options");

    const stored = getLocalCategories();
    let categories = [];

    try {
        const data = await fetchData({ INSTRUCTION: "GET-CATEGORIES" });
        if (data && data.Product_Categories) {
            categories = data.Product_Categories;
            saveLocalCategories(categories);
        } else if (stored) {
            categories = stored;
        }
    } catch {
        if (stored) categories = stored;
    }

    if (!categories.length) {
        optionsContainer.innerHTML = `<div class="option">No categories available</div>`;
        return;
    }

    categories = categories.filter(c => c && c !== "All");
    optionsContainer.innerHTML = "";

    categories.forEach(cat => {
        const opt = document.createElement("div");
        opt.classList.add("option");
        opt.textContent = cat;
        optionsContainer.appendChild(opt);

        opt.addEventListener("click", () => {
            selectedDiv.innerHTML = `${cat} <i class="fa-solid fa-chevron-down sel-arrow"></i>`;
            selectWrapper.dataset.value = cat;
            optionsContainer.style.display = "none";
        });
    });

    selectedDiv.addEventListener("click", e => {
        e.stopPropagation();
        optionsContainer.style.display = optionsContainer.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", e => {
        if (!selectWrapper.contains(e.target)) optionsContainer.style.display = "none";
    });
}


// ── NAVIGATION ───────────────────────────
Back.addEventListener("click", () => {
    window.history.back() || (location.href = "/index.html");
});

NavDash.addEventListener("click", () => {
    Dash();
});

NavProducts.addEventListener("click", async () => {
    Profile.classList.remove("active-profile");
    const isEmpty = ProductList.children.length === 0 || ProductList.querySelector(".no-product-section");
    if (isEmpty) await getMyProducts();
    showProducts();
});

NavOrders.addEventListener("click", () => {
    Profile.classList.remove("active-profile");
    if (PlacedOrdersList.children.length === 0) {
        getPlacedOrders();
    } else {
        showOrders();

    }
});

Profile.addEventListener("click", () => {
    if (MyProfile.style.display === "flex") {
        // Already on profile — toggle back to products
        Profile.classList.remove("active-profile");

        NavProducts.click();
    } else {
        showMyProfile();
        loadAccountInfo();
    }
});


// ── ACCOUNT INFO ─────────────────────────
async function loadAccountInfo() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user) return;

    Display_Account_Name.textContent = user.name || user["User-Name"] || "My Store";
    Display_Account_Id.textContent = user["User-ID"] ? `ID: ${user["User-ID"]}` : "";

    if (user.Email) Display_Old_Email.textContent = user.Email;
    if (user.Phone) Display_Old_Phone.textContent = user.Phone;

    const countryFlag = document.querySelector(".country-flag");
    const countryName = document.querySelector(".country-name");
    document.querySelector(".country-currency").textContent = user["currecyCode"];
    countryFlag.src = `https://flagcdn.com/w320/${user.CountryisoCode}.png`;

    if (user.CountryName) countryName.textContent = user.CountryName;


    const link = document.querySelector(".copy-link");

    link.href = `${ipAddress}/retailer/${user["User-ID"]}`;
    link.textContent = `${ipAddress}/retailer/${user["User-ID"]}`;

    if (user.profilePic) {
        Edit_User_Icon.style.display = "none";
        Display_Profile_Contanner.style.display = "flex";
        Display_Profile_Image.src = `${ipAddress}/profile/${user.profilePic}`;
    }

    //==== Making the upload new emel and cancel new email disaapear 
    Upload_New_Email.style.display = "none";
    Cancel_New_Email.style.display = "none";

    // ==== Making the upload , cancel and input of the phone update vanish
    Upload_New_Phone.style.display = "none";
    Cancel_New_Phone.style.display = "none";
    New_Phone_Input.closest(".iti").style.display = "none";

}


// ── PROFILE PHOTO ────────────────────────
PickNew_Image.addEventListener("click", () => NewImage_Input.click());

NewImage_Input.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
        Display_Profile_Image.src = evt.target.result;
        Display_Profile_Image.style.display = "block";
        Edit_User_Icon.style.display = "none";
        Display_Profile_Contanner.style.display = "flex";
        Upload_New_Image.style.display = "inline-flex";
        Cancel_Profile_Update.style.display = "flex";
    };

    reader.readAsDataURL(file);
});

Upload_New_Image.addEventListener("click", async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !NewImage_Input.files[0]) return;

    const formData = new FormData();
    formData.append("file", NewImage_Input.files[0]);
    formData.append("Data", JSON.stringify({ INSTRUCTION: "UPDATE-PROFILE-PIC", UserID: user["User-ID"] }));

    try {
        Loading.style.display = "flex";
        const result = await UploadFileWithData(formData);
        Loading.style.display = "none";
        if (result && result.status === "OK") {
            user.profilePic = result.url;
            localStorage.setItem("user", JSON.stringify(user));
            ProfileImg.src = `${ipAddress}/profile/${result.profilePic}`;
            SetProfile();
            Upload_New_Image.style.display = "none";
            showToast("fa-solid fa-check", "Photo Updated", "Your profile photo was updated.", "#1a8a00");
        }
    } catch {
        Loading.style.display = "none";
        showToast("fa-solid fa-exclamation", "Upload Failed", "Could not update photo.", "#e53935");
    }
});

Edith_OldPro.addEventListener("click", () => {
    Cancel_Profile_Update.style.display = "flex";
    Upload_New_Image.style.display = "flex";
    Edith_OldPro.style.display = "none";
});


Cancel_Profile_Update.addEventListener("click", () => {
    Upload_New_Image.style.display = "none";
    Cancel_Profile_Update.style.display = "none";
    NewImage_Input.value = "";
    Edith_OldPro.style.display = "flex";
});


// ── EMAIL ────────────────────────────────
Edit_Old_Email.addEventListener("click", () => {
    Display_Old_Email.style.display = "none";
    New_Email_Input.style.display = "block";
    New_Email_Input.focus();
    Upload_New_Email.style.display = "inline-flex";
    Cancel_New_Email.style.display = "inline-flex";
    Edit_Old_Email.style.display = "none";
});

Upload_New_Email.addEventListener("click", async () => {
    const email = New_Email_Input.value.trim();
    if (!email) return showToast("fa-solid fa-keyboard", "Empty Field", "Please enter a new email address.", "#e53935");

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    Loading.style.display = "flex";
    const result = await fetchData({ INSTRUCTION: "UPDATE-EMAIL", UserID: user["User-ID"], NewEmail: email });
    Loading.style.display = "none";

    if (result && result.status === "OK") {
        user.Email = result.Email;
        localStorage.setItem("user", JSON.stringify(user));
        Display_Old_Email.textContent = result.Email;
        Cancel_New_Email.click();
        showToast("fa-solid fa-check", "Email Updated", "Your email was changed successfully.", "#1a8a00");
    }
});

Cancel_New_Email.addEventListener("click", () => {
    Display_Old_Email.style.display = "block";
    New_Email_Input.style.display = "none";
    New_Email_Input.value = "";
    Upload_New_Email.style.display = "none";
    Cancel_New_Email.style.display = "none";
    Edit_Old_Email.style.display = "inline-flex";
});


// ── PHONE ────────────────────────────────
const iti = window.intlTelInput(New_Phone_Input, {
    initialCountry: "auto",
    geoIpLookup: cb => fetch("https://ipapi.co/json/").then(r => r.json()).then(d => cb(d.country_code)).catch(() => cb("gh")),
    separateDialCode: true,
    useFullscreenPopup: false,
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.5/build/js/utils.js"
});

Edit_Old_Phone.addEventListener("click", () => {
    Display_Old_Phone.style.display = "none";
    document.querySelector(".iti").style.display = "block";
    New_Phone_Input.style.display = "block";
    Upload_New_Phone.style.display = "inline-flex";
    Cancel_New_Phone.style.display = "inline-flex";
    Edit_Old_Phone.style.display = "none";
    New_Phone_Input.focus();
});

Upload_New_Phone.addEventListener("click", async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const phone = iti.getNumber();
    if (!user || !phone) return;

    Loading.style.display = "flex";
    const result = await fetchData({ INSTRUCTION: "UPDATE-MY-PHONE", UserID: user["User-ID"], new_Phone: phone });
    Loading.style.display = "none";

    if (result && result.status === "OK") {
        user.Phone = result.New_Phone;
        localStorage.setItem("user", JSON.stringify(user));
        Display_Old_Phone.textContent = result.New_Phone;
        Cancel_New_Phone.click();
        showToast("fa-solid fa-check", "Phone Updated", "Your phone number was changed.", "#1a8a00");
    }
});

Cancel_New_Phone.addEventListener("click", () => {
    Display_Old_Phone.style.display = "block";
    New_Phone_Input.style.display = "none";
    document.querySelector(".iti").style.display = "none";
    Upload_New_Phone.style.display = "none";
    Cancel_New_Phone.style.display = "none";
    Edit_Old_Phone.style.display = "inline-flex";
});


// ── COPY LINK ────────────────────────────
copyIcon.addEventListener("click", () => {
    const url = copyLink.href;
    if (!url || url === window.location.href + "#") return;

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(showCopySuccess).catch(() => fallbackCopy(url));
    } else {
        fallbackCopy(url);
    }
});

function fallbackCopy(text) {
    const ta = Object.assign(document.createElement("textarea"), {
        value: text,
        style: "position:fixed;opacity:0"
    });
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { if (document.execCommand("copy")) showCopySuccess(); } catch { }
    document.body.removeChild(ta);
}

function showCopySuccess() {
    copyIcon.classList.replace("fa-copy", "fa-check");
    copyIcon.style.color = "#1a8a00";
    setTimeout(() => {
        copyIcon.classList.replace("fa-check", "fa-copy");
        copyIcon.style.color = "";
    }, 2000);
}

// ── LOG OUT ──────────────────────────────
LogOut.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/auth/auth.html";
});

// ── UPGRADE OVERLAY ──────────────────────
Upgrade.addEventListener("click", () => {
    Upgrade_Overlay.style.display = "flex";
});

document.querySelector(".cancel-upgrade").addEventListener("click", () => {
    Upgrade_Overlay.style.display = "none";
});
// ======== IMPORTINGING SERVER URL AND API,
import { fetchData } from "../fetch_algorithms/algorithms.js";
import { CONFIG } from "../config/config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,

    // google
    GoogleAuthProvider,
    signInWithPopup,

    // additional info
    getAdditionalUserInfo

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD3JgCvgmkgbbdpfbQmdqkZvc3XnVBUZq4",
    authDomain: "bicycon.firebaseapp.com",
    projectId: "bicycon",
    storageBucket: "bicycon.firebasestorage.app",
    messagingSenderId: "229403209252",
    appId: "1:229403209252:web:77d332085228eb4b16b2b1",
    measurementId: "G-FMQ7TYKQ29"
};


const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


provider.setCustomParameters({
    prompt: "select_account"
});

// ==================== SELECTORS ====================
const Back = document.getElementById("back");

const Card1 = document.querySelector("#card-1");
const Card2 = document.querySelector("#card-2");
const Card3 = document.querySelector("#card-3");
const Card4 = document.querySelector("#card-4");
const Card5 = document.querySelector("#card-5");

const cards = [Card1, Card2, Card3, Card4, Card5];
const delay = 5000; // total time per card
const fadeDuration = 800; // in ms

const toast = document.querySelector(".toast");
const toastIcon = document.querySelector(".toast-icon > i");
const toastHeader = document.querySelector(".toast-content > h4");
const toastText = document.querySelector(".toast-text");

const Loading = document.querySelector("#loading-overlay");

/*======= Sign up variable =======*/

const SignInSection = document.querySelector(".signIn-section");
const SignInCard = SignInSection.querySelector(".signInCard");
const RegisterBusiness = document.querySelector(".register-buisiness-section");
const ContinueWithGoogle = SignInSection.querySelector(".google-auth-card button");
const BuisinessName = RegisterBusiness.querySelector(".name input");
const RetailerPhone = RegisterBusiness.querySelector(".phone input");

let Email = null;

let ipAddress = CONFIG.SERVER_URL;

document.addEventListener("DOMContentLoaded", async () => {

    RegisterBusiness.style.display = "none";
    toast.classList.add("hide");
});


function showToast(icon, header, text, iconColor) {
    toastIcon.className = "toast-icon"; // safe reset
    toastIcon.className = "";
    icon.split(" ").forEach(cls => {
        toastIcon.classList.add(cls);
    });

    toastIcon.style.color = iconColor;
    toastHeader.textContent = header;
    toastText.textContent = text;
    toast.classList.remove("hide");

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.add("hide");
    }, 5000);
}

// ==================== BACK BUTTON ====================
Back.addEventListener("click", () => {
    if (!window.history.back()) {
        location.href = "/index.html";
        window.history.clear();
    } else {
        window.history.back();
        window.history.clear();
    }
});

// ==================== CARD SEQUENCE ====================
function showSequence() {
    let i = 0;

    function showCard() {
        const card = cards[i];
        card.classList.add("show");

        setTimeout(() => {
            card.classList.add("out");

            setTimeout(() => {
                card.classList.remove("show", "out");
                i = (i + 1) % cards.length;
                showCard();
            }, fadeDuration);

        }, delay - fadeDuration);
    }

    showCard();
}

showSequence();


ContinueWithGoogle.addEventListener("click", async () => {
    try {

        Loading.style.display = "flex";
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        console.log(user);

        Email = user["email"];

        let payload = {
            "INSTRUCTION": "CHECK-EXISTING-EMAIL",
            "retailer-email": Email
        }

        let Result = await fetchData(payload);
        if (Result.status === "OK") {
            Loading.style.display = "none";
            delete Result.status;
            localStorage.setItem(
                "user",
                JSON.stringify(Result)
            );
            window.location.replace("/main/main.html");
        } else if (Result.status === "!OK") {
            Loading.style.display = "none";
            SignInCard.style.display = "none";
            RegisterBusiness.style.display = "flex";
        }

    } catch (err) {
        Loading.style.display = "none";
        showToast(
            "fa-solid fa-exclamation",
            "Internet Error",
            "Sorry and error occured please check your internet connection and try again",
            "red"
        );
        console.log(err);
    }
});

RegisterBusiness.querySelector(".register-buisiness").addEventListener("click", async () => {
    let Name = BuisinessName.value.trim();
    let Phone = RetailerPhone.value.trim();

    if (Name === "" || Phone === "") {
        showToast(
            "fa-solid fa-keyboard",
            "Required Fields",
            "All input fields are required",
            "red"
        );

        return;
    }

    if (!iti.isValidNumber()) {
        showToast(
            "fa-solid fa-phone",
            "Incorrect Phone",
            "The phone number you entered is incorrect",
            "red"
        );

        return;
    }

    let CountrData = iti.getSelectedCountryData();

    let Payload = {
        "INSTRUCTION": "REGISTER-NEW-RETAILER",
        "email": Email,
        "business-name": Name,
        "phone": iti.getNumber(),
        "dialCode": "+" + CountrData.dialCode,
        "iso2": CountrData.iso2,
        "country": CountrData.name
    }


    try {
        Loading.style.display = "flex";
        let Result = await fetchData(Payload);
        if (Result) {
            Loading.style.display = "none";
            window.localStorage.setItem("user", Result);
            window.location.href = "./main/main.html";
            window.history.clear();
        }
    } catch (err) {
        Loading.style.display = "none";
        showToast(
            "fa-solid fa-exclamation",
            "Internet Error",
            "An error ocured while registering your business",
            "red"
        );
    }


});

const iti = window.intlTelInput(RetailerPhone, {
    initialCountry: "auto",
    geoIpLookup: function (callback) {
        fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(data => callback(data.country_code))
            .catch(() => callback("us"));
    },
    separateDialCode: true,
    useFullscreenPopup: false,
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.5/build/js/utils.js"
});


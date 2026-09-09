// =========================================================
// IMPORTS
// =========================================================

import { fetchData } from "../fetch_algorithms/algorithms.js";
import { CONFIG } from "../config/config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// =========================================================
// FIREBASE CONFIGURATION
// =========================================================

const firebaseConfig = {
  apiKey: "AIzaSyD3JgCvgmkgbbdpfbQmdqkZvc3XnVBUZq4",
  authDomain: "bicycon.firebaseapp.com",
  projectId: "bicycon",
  storageBucket: "bicycon.firebasestorage.app",
  messagingSenderId: "229403209252",
  appId: "1:229403209252:web:77d332085228eb4b16b2b1",
  measurementId: "G-FMQ7TYKQ29",
};

// =========================================================
// FIREBASE INITIALIZATION
// =========================================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

// =========================================================
// CONFIGURATION
// =========================================================

const serverUrl = CONFIG.SERVER_URL;

// =========================================================
// DOM SELECTORS
// =========================================================

// Navigation
const Back = document.getElementById("back");

// Introduction cards
const Card1 = document.querySelector("#card-1");
const Card2 = document.querySelector("#card-2");
const Card3 = document.querySelector("#card-3");
const Card4 = document.querySelector("#card-4");
const Card5 = document.querySelector("#card-5");

const cards = [Card1, Card2, Card3, Card4, Card5];

// Toast
const toast = document.querySelector(".toast");
const toastIcon = document.querySelector(".toast-icon > i");
const toastHeader = document.querySelector(".toast-content > h4");
const toastText = document.querySelector(".toast-text");

// Loading
const Loading = document.querySelector("#loading-overlay");

// Authentication
const SignInSection = document.querySelector(".signIn-section");
const SignInCard = SignInSection?.querySelector(".signInCard");

// Business registration
const RegisterBusiness = document.querySelector(".register-buisiness-section");

const ContinueWithGoogle = SignInSection?.querySelector(
  ".google-auth-card button",
);

const RegisterBusinessButton = RegisterBusiness?.querySelector(
  ".register-buisiness",
);

const BuisinessName = RegisterBusiness?.querySelector(".name input");

const RetailerPhone = RegisterBusiness?.querySelector(".phone input");

// =========================================================
// STATE
// =========================================================

let Email = null;
let iti = null;

let toastTimer = null;
let toastHideTimer = null;

// =========================================================
// UTILITY FUNCTIONS
// =========================================================

/**
 * Show or hide the loading overlay.
 */
function setLoading(isLoading) {
  if (!Loading) return;

  Loading.style.display = isLoading ? "flex" : "none";
}

/**
 * Safely save the user returned by the backend.
 */
function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

/**
 * Show the business registration section.
 */
function showBusinessRegistration() {
  if (SignInCard) {
    SignInCard.style.display = "none";
  }

  if (RegisterBusiness) {
    RegisterBusiness.style.display = "flex";
  }
}

/**
 * Hide the business registration section.
 */
function hideBusinessRegistration() {
  if (RegisterBusiness) {
    RegisterBusiness.style.display = "none";
  }
}

/**
 * Redirect to the main application.
 */
function openMainPage() {
  window.location.replace("/main/main.html");
}

// =========================================================
// DOM INITIALIZATION
// =========================================================

function initializePage() {
  hideBusinessRegistration();

  if (toast) {
    toast.classList.remove("show");
    toast.classList.add("hide");
  }
}

// =========================================================
// TOAST NOTIFICATION
// =========================================================

function hideToast() {
  if (!toast) return;

  toast.classList.remove("show");

  toastHideTimer = setTimeout(() => {
    toast.classList.add("hide");
  }, 300);
}

/**
 * Display a toast notification.
 *
 * @param {string} icon
 * @param {string} header
 * @param {string} text
 * @param {string} iconColor
 */
function showToast(icon, header, text, iconColor) {
  if (!toast || !toastIcon || !toastHeader || !toastText) {
    return;
  }

  // Clear previous timers
  clearTimeout(toastTimer);
  clearTimeout(toastHideTimer);

  // Reset icon classes
  toastIcon.className = "";

  icon
    .split(" ")
    .filter(Boolean)
    .forEach((className) => {
      toastIcon.classList.add(className);
    });

  // Set content
  toastIcon.style.color = iconColor;
  toastHeader.textContent = header;
  toastText.textContent = text;

  // Show toast
  toast.classList.remove("hide");

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Automatically hide
  toastTimer = setTimeout(() => {
    hideToast();
  }, 5000);
}

// =========================================================
// BACK BUTTON
// =========================================================

function setupBackButton() {
  if (!Back) return;

  Back.addEventListener("click", () => {
    /*
     * history.back() does not return a boolean.
     * Check whether there is actually a previous page
     * before attempting to navigate backwards.
     */
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/index.html";
    }
  });
}

// =========================================================
// INTRODUCTION CARD SEQUENCE
// =========================================================

const CARD_DELAY = 5000;
const FADE_DURATION = 800;

/**
 * Cycle through the introductory cards.
 */
function showSequence() {
  const validCards = cards.filter(Boolean);

  if (!validCards.length) return;

  let currentIndex = 0;

  function showCard() {
    const card = validCards[currentIndex];

    card.classList.remove("out");
    card.classList.add("show");

    setTimeout(() => {
      card.classList.remove("show");
      card.classList.add("out");

      setTimeout(() => {
        card.classList.remove("out");

        currentIndex = (currentIndex + 1) % validCards.length;

        showCard();
      }, FADE_DURATION);
    }, CARD_DELAY - FADE_DURATION);
  }

  showCard();
}

// =========================================================
// GOOGLE SIGN-IN
// =========================================================

async function handleGoogleSignIn() {
  try {
    setLoading(true);

    // Open Google authentication popup
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    if (!user?.email) {
      throw new Error("Google account email was not returned.");
    }

    Email = user.email;

    // Check whether the email already belongs to a retailer
    const payload = {
      INSTRUCTION: "CHECK-EXISTING-EMAIL",
      "retailer-email": Email,
    };

    const Result = await fetchData(payload);

    if (!Result) {
      throw new Error("No response received from the server.");
    }

    // =====================================================
    // EXISTING USER
    // =====================================================

    if (Result.status === "OK") {
      delete Result.status;

      saveUser(Result);

      openMainPage();

      return;
    }

    // =====================================================
    // NEW USER
    // =====================================================

    if (Result.status === "!OK") {
      showBusinessRegistration();

      return;
    }

    // =====================================================
    // UNEXPECTED RESPONSE
    // =====================================================

    throw new Error("Unexpected response from the server.");
  } catch (error) {
    console.error("Google authentication error:", error);

    showToast(
      "fa-solid fa-exclamation",
      "Internet Error",
      "Sorry, an error occurred. Please check your internet connection and try again.",
      "red",
    );
  } finally {
    setLoading(false);
  }
}

// =========================================================
// BUSINESS REGISTRATION
// =========================================================

async function registerBusiness() {
  const Name = BuisinessName?.value.trim();
  const Phone = RetailerPhone?.value.trim();

  // ---------------------------------------------------------
  // Required fields
  // ---------------------------------------------------------

  if (!Name || !Phone) {
    showToast(
      "fa-solid fa-keyboard",
      "Required Fields",
      "All input fields are required.",
      "red",
    );

    return;
  }

  // ---------------------------------------------------------
  // Phone validation
  // ---------------------------------------------------------

  if (!iti || !iti.isValidNumber()) {
    showToast(
      "fa-solid fa-phone",
      "Incorrect Phone",
      "The phone number you entered is incorrect.",
      "red",
    );

    return;
  }

  // ---------------------------------------------------------
  // Country information
  // ---------------------------------------------------------

  const countryData = iti.getSelectedCountryData();

  // ---------------------------------------------------------
  // Registration payload
  // ---------------------------------------------------------

  const payload = {
    INSTRUCTION: "REGISTER-NEW-RETAILER",

    email: Email,

    "business-name": Name,

    phone: iti.getNumber(),

    dialCode: `+${countryData.dialCode}`,

    iso2: countryData.iso2,

    country: countryData.name,
  };

  try {
    setLoading(true);

    const Result = await fetchData(payload);

    if (!Result) {
      throw new Error("No response received from the server.");
    }

    // -----------------------------------------------------
    // Registration successful
    // -----------------------------------------------------

    saveUser(Result);

    openMainPage();
  } catch (error) {
    console.error("Business registration error:", error);

    showToast(
      "fa-solid fa-exclamation",
      "Registration Error",
      "An error occurred while registering your business. Please try again.",
      "red",
    );
  } finally {
    setLoading(false);
  }
}

// =========================================================
// INTERNATIONAL PHONE INPUT
// =========================================================

function initializePhoneInput() {
  if (!RetailerPhone || typeof window.intlTelInput !== "function") {
    console.warn("International telephone input could not be initialized.");

    return;
  }

  iti = window.intlTelInput(RetailerPhone, {
    initialCountry: "auto",

    geoIpLookup(callback) {
      fetch("https://ipapi.co/json")
        .then((response) => response.json())
        .then((data) => {
          callback(data.country_code || "us");
        })
        .catch(() => {
          callback("us");
        });
    },

    separateDialCode: true,

    useFullscreenPopup: false,

    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.5/build/js/utils.js",
  });
}

// =========================================================
// EVENT LISTENERS
// =========================================================

function setupEventListeners() {
  // Google sign-in
  ContinueWithGoogle?.addEventListener("click", handleGoogleSignIn);

  // Business registration
  RegisterBusinessButton?.addEventListener("click", registerBusiness);
}

// =========================================================
// INITIALIZATION
// =========================================================

function initialize() {
  initializePage();

  setupBackButton();

  setupEventListeners();

  initializePhoneInput();

  showSequence();
}

// Run after the DOM is available
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize, { once: true });
} else {
  initialize();
}

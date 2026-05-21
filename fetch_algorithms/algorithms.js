import { CONFIG } from "../config/config.js";
let URL = CONFIG.SERVER_URL;


// algoritem to push data without an images to the server for a responce
async function fetchData(payload) {
    try {
        const res = await fetch(`${URL}/api/process`, {
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

// algoritem to push data with an images to the server for a responce
async function UploadFileWithData(formData) {
    try {
        const res = await fetch(`${URL}/api/file`, {
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

export {fetchData , UploadFileWithData}

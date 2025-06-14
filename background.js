chrome.cookies.onChanged.addListener((changeInfo) => {
    // Log cookie changes (optional)
    console.log("Cookie changed:", changeInfo);
});

async function editHttpOnlyCookie(url, name, newValue) {
    try {
        const cookie = await chrome.cookies.get({
            url: url,
            name: name
        });
        if (cookie) {
            
            chrome.cookies.remove({
                url: url,
                name: name
            })

            await chrome.cookies.set({
                url: url,
                name: name,
                value: newValue,
                httpOnly: true, // Ensure it remains HttpOnly
                secure: cookie.secure,
                sameSite: cookie.sameSite,
                path: cookie.path,
                domain: cookie.domain,
                expirationDate: cookie.expirationDate
            });
            console.log(`Cookie ${name} updated successfully`);
        } else {
            console.log(`Cookie ${name} not found`);
        }
    } catch (error) {
        console.error("Error editing cookie:", error);
    }
}

// Example usage:
// Assuming you have a popup.html with a button that calls this function
async function onEditButtonClick() {
    const url = "https://web.getcontact.com"; // Replace with the target URL
    const cookieName = "accessToken"; // Replace with the cookie name
    const newCookieValue = "jlbo18lf04j3g30tnos9i52op8"; // Replace with the new value
    await editHttpOnlyCookie(url, cookieName, newCookieValue);
}

// Example of listening for messages from the popup
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.action === "editCookie") {
            onEditButtonClick();
        }
    }
);
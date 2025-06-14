document.getElementById('editButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({
        action: "editCookie"
    });
});
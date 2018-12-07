function getBadgeTextCallback(badgeText) {
    if (!badgeText || badgeText === 'off') {
        chrome.browserAction.setBadgeText({ text: "on" });
        chrome.browserAction.setBadgeBackgroundColor({
            color: "green"
        })
    } else {
        chrome.browserAction.setBadgeText({ text: "off" });
        chrome.browserAction.setBadgeBackgroundColor({
            color: "red"
        })
    }
}

function toggleState() {
    console.log("test");
    chrome.browserAction.getBadgeText({}, getBadgeTextCallback)
};

chrome.browserAction.onClicked.addListener(toggleState);

toggleState();
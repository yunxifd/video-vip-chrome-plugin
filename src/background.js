var contexts = ["page", "link"];

function onClickMenu(info, tab) {
    console.log(info, tab);
}

function getProfiles() {
    var profiles = localStorage.getItem("profiles") || "";
    var list = profiles.split('\n');
    var result = [];
    list.forEach(item => {
        if (item) {
            var tmp = item.split("$");
            if (tmp.length === 2) {
                result.push({
                    name: tmp[0],
                    url: tmp[1]
                })
            } else {
                console.error("配置数据，格式错误，目前只支持 \{\name}\$\{url\}格式")
            }
        }
    })
    return result;
}

const profiles = getProfiles();

function openNewTab(interfaceUrl, linkUrl) {
    var url = interfaceUrl + linkUrl;
    chrome.tabs.create({
        url: url
    })
}

profiles.forEach((p, index) => {
    var title = p.name || "接口" + (index + 1)
    chrome.contextMenus.create({
        id: title,
        title: title,
        contexts: contexts
    })
})
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    var linkUrl = info.linkUrl || info.pageUrl;
    var index = 0;
    if (info.menuItemId == 'defaultMenu') {
        index = 0;
    }
    console.log(info, tab);
})

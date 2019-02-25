

var contexts = ["page", "link"];

function getProfiles() {
    var list = [{
        name: '牛巴巴',
        url: 'http://mv.688ing.com/?uri=test#'
    }];
    chrome.storage.sync.get(["list"], function (result) {
        if (result.list)
            list = list;
    })

    return list;
}

const profiles = getProfiles();

function openNewTab(interfaceUrl, linkUrl) {
    var url = interfaceUrl + linkUrl;
    chrome.tabs.create({
        url: url
    })
}

var menuId = chrome.contextMenus.create({
    title: '使用vip视频解析接口播放',
    contexts: contexts
});

profiles.forEach((p, index) => {
    var title = p.name;
    chrome.contextMenus.create({
        id: index.toString(),
        title: title,
        parentId: menuId,
        contexts: contexts
    })
})

chrome.contextMenus.onClicked.addListener(function (info) {
    var linkUrl = info.linkUrl || info.pageUrl;
    console.log(info);
    var interfaceUrl = profiles[Number.parseInt(info.menuItemId)].url;
    openNewTab(interfaceUrl, linkUrl)
})

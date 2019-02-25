var textarea = document.getElementById("list");

chrome.storage.sync.get(['list'], function (items) {
    if (items.list) {
        items.list.map(item => {
            var tmp = item.name + "$" + item.url;
            return tmp;
        }).join('\r\n');
    }
    else
        textarea.value = "";
})

textarea.addEventListener('blur', function (event) {
    var value = event.target.value;
    var result = [];
    if (value && value.trim())
        result = value.trim()
            .split('\n')
            .map(v => v.trim())
            .map(v => {
                var tmp = v.split('$');
                return {
                    name: tmp[0],
                    url: tmp[1]
                }
            });
    chrome.storage.sync.set({ 'list': result });
});
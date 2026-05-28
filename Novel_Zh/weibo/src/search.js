load("config.js");

function execute(key, page) {
    if (!page) page = "1";
    key = wbTrim(key);
    var containerid = "100103type=1&q=" + key + "&t=";
    if (/^#.*#$/.test(key)) {
        key = key.replace(/^#/, "").replace(/#$/, "");
        containerid = "100103type=38&q=" + key + "&t=";
    } else if (/^%.*%$/.test(key)) {
        key = key.replace(/^%/, "").replace(/%$/, "");
        containerid = "100103type=98&q=" + key + "&t=";
    } else if (/^@.*@$/.test(key)) {
        key = key.replace(/^@/, "").replace(/@$/, "");
        containerid = "100103type=3&q=" + key + "&t=";
    }
    var url = wbContainerUrl(containerid, page);
    var json = wbFetchJson(url);
    if (json && json.msg) {
        return Response.error(String(json.msg));
    }
    var data = [];
    if (json && json.data && json.data.cards) wbCollectCards(json.data.cards, data);
    var next = data.length > 0 ? String(parseInt(page, 10) + 1) : null;
    return Response.success(data, next);
}

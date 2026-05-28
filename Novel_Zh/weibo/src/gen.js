load("config.js");

function execute(url, page) {
    if (!page) page = "1";
    var pageUrl = String(url).replace("{{page}}", String(page));
    if (pageUrl.indexOf("page=") < 0) {
        pageUrl = wbBuildUrl(pageUrl, { page: String(page) });
    }
    var json = wbFetchJson(pageUrl);
    if (json && json.msg) return Response.error(String(json.msg));
    var data = [];
    if (json && json.data && json.data.cards) wbCollectCards(json.data.cards, data);
    var next = data.length > 0 ? String(parseInt(page, 10) + 1) : null;
    if (json && json.data && json.data.cardlistInfo && json.data.cardlistInfo.page) {
        next = String(json.data.cardlistInfo.page);
    }
    return Response.success(data, next);
}

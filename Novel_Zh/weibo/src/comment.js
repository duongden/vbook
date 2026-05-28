load("config.js");

function execute(input, page) {
    if (!page) page = "1";
    var url = String(input || "");
    if (page !== "1" && url.indexOf("max_id=") >= 0) {
        url = url.replace(/max_id=[^&]*/, "max_id=" + encodeURIComponent(page));
    }
    var json = wbFetchJson(url);
    var data = [];
    if (!json || json.ok !== 1 || !json.data || !json.data.data) {
        return Response.success(data, null);
    }
    var list = json.data.data;
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var pic = "";
        if (item.pic && item.pic.large && item.pic.large.url) {
            pic = '<br><img src="' + item.pic.large.url + '"><br>';
        }
        data.push({
            name: item.user && item.user.screen_name ? item.user.screen_name : "",
            content: wbStripTags(item.text || "") + pic,
            description: item.created_at || ""
        });
    }
    var next = json.data.max_id ? String(json.data.max_id) : null;
    return Response.success(data, next);
}

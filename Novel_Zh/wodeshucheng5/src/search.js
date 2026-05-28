load("config.js");

function execute(key) {
    var response = fetchDoc(BASE_URL + "/");
    if (!response.ok) return Response.success([]);

    var doc = response.html();
    var data = [];
    doc.select("a[href^='/book_']").forEach(function (a) {
        var name = cleanText(a.text()) || cleanText(a.attr("title"));
        var href = a.attr("href");
        if (!name || href.indexOf(".html") > -1 || name.indexOf(key) === -1) return;
        data.push({
            name: name,
            link: absUrl(href),
            description: "",
            host: BASE_URL
        });
    });
    return Response.success(uniqueSearch(data));
}

function uniqueSearch(items) {
    var data = [];
    var seen = {};
    for (var i = 0; i < items.length; i++) {
        if (seen[items[i].link]) continue;
        seen[items[i].link] = true;
        data.push(items[i]);
    }
    return data;
}

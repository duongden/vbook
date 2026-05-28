load("config.js");

function execute(url) {
    var id = bookIdFromUrl(url);
    if (!id) return Response.success([]);

    var chapters = [];
    for (var page = 1; page <= 200; page++) {
        var response = fetchDoc(bookUrl(id, page));
        if (!response.ok) break;
        var doc = response.html();
        var before = chapters.length;
        doc.select(".section-box").last().select(".section-list li a[href$=.html]").forEach(function (a) {
            var href = a.attr("href");
            if (!href) return;
            chapters.push({
                name: cleanText(a.text()),
                url: absUrl(href),
                host: BASE_URL
            });
        });
        if (chapters.length === before) break;
        if (!hasNextToc(doc)) break;
    }
    return Response.success(chapters);
}

function hasNextToc(doc) {
    return cleanText(doc.select(".index-container a:contains(下一页)").text()).length > 0;
}

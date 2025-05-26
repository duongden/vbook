load('config.js');
function execute(url) {
    var doc = Http.get(url).html();
    //#tab-b2 > div > ul > li:nth-child(1) > a
    var el = doc.select(".tab-content ul li a");
    const data = [];
    for (var i = 10; i < el.size(); i++) {
        var e = el.get(i);
        data.push({
            name: e.select("a").text(),
            url: e.attr("href"),
            host: BASE_URL
        })
    }

    return Response.success(data);
}
load('config.js');

function execute(url) {
    var doc = Http.get(url).html();
    var el = doc.select(".chapters li a");
    const data = [];

    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        data.push({
            name: e.select("span.font-weight-bold").text(),
            url: BASE_URL + e.attr("href"),
            host: BASE_URL
        });
    }

    return Response.success(data);
}

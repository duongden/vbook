load('config.js');
function execute(key) {
    const doc = fetch(BASE_URL + '/i/sor.aspx?key=' + key).html();
    const el = doc.select(".container .item")
    const data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        data.push({
            name: e.select("div.item > div > h3 > a").first().text(),
            link: BASE_URL + e.select(".item a").first().attr("href"),
            cover: BASE_URL + e.select(".item img").first().attr("src"),
            description: e.select("div.item > div > p:nth-child(3)").first().text(),
            host: BASE_URL
        })
    }
    return Response.success(data)
}
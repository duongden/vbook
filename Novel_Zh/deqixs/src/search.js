load('config.js');

function execute(key) {
    const url = BASE_URL + '/tag/?key=' + key;

    const response = fetch(url, {
        headers: {
            "referer": BASE_URL + "/so/"
        }
    });

    if (!response.ok) return null;

    const doc = response.html();
    const el = doc.select(".container .item");
    const data = [];

    for (let i = 0; i < el.size(); i++) {
        const e = el.get(i);
        data.push({
            name: e.select("div.item > div > h3 > a").first().text(),
            link: BASE_URL + e.select(".item a").first().attr("href"),
            cover: "https" + e.select(".item img").first().attr("src"),
            description: e.select("div.item > div > p:nth-child(3)").first().text(),
            host: BASE_URL
        });
    }

    return Response.success(data);
}

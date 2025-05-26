load('config.js');
function execute(key, page) {
    if (!page) page = 1;
    let response = fetch(BASE_URL + '/advanced-search?key=' + key + "&wg=&wog=&status=");

    if (response.ok) {
        let doc = response.html();
        const data = [];

		doc.select(".as-results .manga-box").forEach(e => {
            data.push({
                name: e.select("h3 a").first().text(),
                link: e.select("h3 a").first().attr("href"),
                cover: e.select("a img").first().attr("data-original"),
                description: e.select(".detail").first().text(),
                host: BASE_URL
            })
        });
        var next = (parseInt(page)+1).toString();
        return Response.success(data,next)
    }
    return null;
}
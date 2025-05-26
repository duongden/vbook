load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(BASE_URL + url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select(".hot .item").forEach(e => {
            data.push({
                name: e.select("dt a").first().text(),
                cover: e.select(".image img").attr("data-src"),
                link: BASE_URL + e.select("dt a").first().attr("href"),
                description: e.select("dt span").first().text(),
                host: BASE_URL
            })
        });
        return Response.success(data)
    }
    return null;
}
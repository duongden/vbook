load('config.js');
function execute(url,page) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (!page) page = 1;
    if (url.indexOf("?page=") === -1) {
        url = url + "?page=" + page;
    }
    let response = fetch(BASE_URL + url);
    console.log(BASE_URL + url)
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".rank_ullist li").forEach(e => {
            data.push({
                cover:e.select("img").first().attr("src"),
                name: e.select(".rank_bkname a").first().text(),
                link: BASE_URL + e.select(".rank_bkname a").first().attr("href"),
                description: e.select(".author").first().text(),
                host: BASE_URL
            })
        });
        var next = (parseInt(page)+1).toString();
        return Response.success(data, next)
    }
    return null;
}
load('config.js');
function execute(url,page) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (!page) page = 1;
    if (url.indexOf("&page=") === -1) {
        url = url + "&order=2" + "&page=" + page;
    }
    let response = fetch(BASE_URL + url);
    console.log(BASE_URL + url)
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".v_books li").forEach(e => {
            data.push({
                name: e.select(".bkitem_name a").first().text(),
                link: BASE_URL + e.select(".bkitem_name a").first().attr("href"),
                description: e.select(".bkitem_author").first().text(),
                host: BASE_URL
            })
        });
        var next = (parseInt(page)+1).toString();
        return Response.success(data, next)
    }
    return null;
}
load('config.js');
function execute(url, page) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (!page) page = '1';
    let response = fetch(BASE_URL + url + page + ".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select(".l li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text(),
                link:
                e.select(".s2 a").first().attr("href"),
                description: e.select(".s3 a").first().text(),
                host: BASE_URL
            });
        });
        let next = (parseInt(page, 10) + 1).toString();
        return Response.success(data, next);
    }
    return null;
}

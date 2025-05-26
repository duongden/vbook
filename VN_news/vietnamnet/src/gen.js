load('config.js');

function execute(url, page) {
    if (!page) page = '0';
    let response = fetch(BASE_URL + url + "-page" + page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select(".banner-advertisement").remove();
        doc.select(".container__left div.horizontalPost").forEach(e => {
            data.push({
                name: e.select(".horizontalPost__main-title  a").first().text().trim(),
                cover: e.select("img").attr("data-srcset"),
                link: BASE_URL + e.select(".horizontalPost__main-title  a").first().attr("href"),
                description: "",
                host: BASE_URL
            });
        });
        var next = (parseInt(page) + 1).toString();
        return Response.success(data, next);
    }
    return null;
}

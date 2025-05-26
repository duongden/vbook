load('config.js');
function execute(url, page) {
    if (!page) page = '1';
    let response = fetch(url + "/" + page);
    console.log(BASE_URL + url + "/" + page)
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select(".home-list .manga-box").forEach(e => {
            let coverImg = e.select(".image img").first().attr("data-original")
            data.push({
                name: e.select("h3 a").first().text(),
                link: e.select("h3 a").first().attr("href"),
                cover: coverImg,
                description: "Episode(s): " + e.select(".detail").first().text(),
                host: BASE_URL
            })
        });
        var next = (parseInt(page)+1).toString();
        return Response.success(data, next);
    }
    return null;
}
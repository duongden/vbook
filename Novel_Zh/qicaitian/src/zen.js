function execute(url, page) {
    url = url.replace('m.qicaitian.com', 'www.qicaitian.com');
    if (!page) page = '1';
    let response = fetch("https://www.qicaitian.org" + url + page + "/");
    console.log("https://www.qicaitian.org" + url + page + "/");

    if (response.ok) {
        let doc = response.html();
        const data = [];

        doc.select("#hotcontent .item").forEach(e => {
            data.push({
                name: e.select("dt a").first().text(),
                link: "https://www.qicaitian.org" + e.select("dt a").first().attr("href"),
                cover: e.select(".image img").first().attr("data-original"),
                description: e.select(".btm a").first().text(),
                host: "https://www.qicaitian.org"
            })
        });
        let next = parseInt(page, 10) + 1
        return Response.success(data, next.toString())
    }
    return null;
}
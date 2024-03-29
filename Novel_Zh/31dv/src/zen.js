function execute(url, page) {
    if (!page) page = '1';

    let response = fetch("https://www.31dv.com" + url + page + "/");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("a:contains(>>)").first().attr("href").slice(0, -1).split(/[/ ]+/).pop()
        console.log(next)
        doc.select(".item").forEach(e => {
            data.push({
                name: e.select("dl dt a").first().text().replace("《", "").replace("》", ""),
                link: "https://www.31dv.com" + e.select("dl dt a").attr("href"),
                cover: e.select(".image a img").attr("data-original"),
                description: e.select(".btm").text(),
                host: "https://www.31dv.com"
            })
        });


        return Response.success(data, next)
    }
    return null;
}
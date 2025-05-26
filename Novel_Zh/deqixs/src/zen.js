load('config.js');
function execute(url, page) {
    if (!page) page = 1;
    let response = fetch(BASE_URL + url + page + ".html");
    console.log(BASE_URL + url + page + ".html")
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = parseInt(page) + 1;
        console.log(next)
        doc.select(".container .item").forEach(e => {
            data.push({
                name: e.select("h3 > a").text().replace("《", "").replace("》", ""),
                link: BASE_URL + e.select("h3 > a").attr("href"),
                cover: BASE_URL + e.select(" a > img").attr("src"),
                description: e.select(".item  div > p:nth-child(3) > a").text(),
                host: BASE_URL
            })
        });
        return Response.success(data, next)
    }
    return null;
}
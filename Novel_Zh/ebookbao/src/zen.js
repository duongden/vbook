load('config.js');
function execute(url,page) {
    if (!page) page = '1';
    let response = fetch(BASE_URL + url + page + ".html");
    console.log(BASE_URL + url + page + ".html");

    if (response.ok) {
        let doc = response.html();
        const data = [];

		doc.select("#main .hot_sale").forEach(e => {
            data.push({
                name: e.select("p.title").first().text().replace("《","").replace("》",""),
                link: BASE_URL + e.select(".bookinfo a").first().attr("href"),
                cover: BASE_URL + e.select(".bookimg img").first().attr("src"),
                description: e.select("p.author").first().text(),
                host: BASE_URL
            })
        });
        var next = (parseInt(page)+1).toString();
        return Response.success(data, next)
    }
    return null;
}
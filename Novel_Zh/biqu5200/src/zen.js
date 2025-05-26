load('config.js');
function execute(url) {
    let response = fetch(BASE_URL + url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("#newscontent .l li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text().replace("《", '"').replace("》", '"'),
                link: BASE_URL + e.select(".s2 a").first().attr("href"),
                description: e.select(".s5").first().text(),
                host: BASE_URL
            })
            })
        return Response.success(data)
    }
    return null;
}
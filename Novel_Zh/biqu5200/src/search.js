load('config.js');
function execute(key) {
    let response = fetch(BASE_URL + '/modules/article/search.php?searchkey=' + key);

    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select("#hotcontent > table > tbody > tr:nth-child(1)").remove()
		doc.select("tbody tr").forEach(e => {
            data.push({
                name: e.select("td.odd").first().text(),
                link: BASE_URL + e.select("td.odd a").first().attr("href"),
                description: e.select("td:nth-child(3)").first().text(),
                host: BASE_URL
            })
        });
        return Response.success(data);
    }
    return null;
}
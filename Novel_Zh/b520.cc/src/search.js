function execute(key) {
    let response = fetch('http://www.b520.cc/modules/article/search.php?searchkey=' + key);

    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select("#hotcontent > table > tbody > tr:nth-child(1)").remove()
        //#hotcontent > table > tbody > tr:nth-child(2) > td:nth-child(3)
		doc.select("tbody tr").forEach(e => {
            data.push({
                name: e.select("td.odd").first().text(),
                link: "http://www.b520.cc" + e.select("td.odd a").first().attr("href"),
                description: e.select("td:nth-child(3)").first().text(),
                host: "http://www.b520.cc"
            })
        });
        return Response.success(data);
    }
    return null;
}
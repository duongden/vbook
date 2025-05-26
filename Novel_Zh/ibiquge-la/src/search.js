load('config.js');
function execute(key, page) {
    let response = fetch(BASE_URL + '/modules/article/waps.php', {
        method: "POST",
        body: {
            searchkey : key,
        }
    });
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select(".grid tr td").forEach(e => {
            if (e.select("a").first().text() !== null && e.select("a").first().text() !== '') {
                data.push({
                    //#checkform > table > tbody > tr:nth-child(2) > td:nth-child(3)
                    name: e.select("td:nth-child(1) > a").first().text(),
                    link: e.select("td:nth-child(1) > a").first().attr("href"),
                    description: e.select("td:nth-child(3)").first().text(),
                    host: BASE_URL
                })
            }
        });

        return Response.success(data);
    }
    return null;
}

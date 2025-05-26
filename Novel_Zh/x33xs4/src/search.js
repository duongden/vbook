load('config.js');
function execute(key) {
    let response = fetch(BASE_URL + '/search.php?keyword=' + key);

    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".result-list div.result-item").forEach(e => {
            let author = e.select("p.result-game-item-info-tag:nth-child(1) > span:nth-child(2)").last().text();
            data.push({
                name: e.select("a.result-game-item-title-link").first().text(),
                link: BASE_URL + e.select("a.result-game-item-title-link").first().attr("href"),
                description: "Tác giả: " + author,
                host: BASE_URL
            })
        });
        //#wrapper > div.result-list.gameblock-result-list > div:nth-child(1) > div.result-game-item-detail > div > p:nth-child(1) > span:nth-child(2)

        return Response.success(data);
    }
    return null;
}
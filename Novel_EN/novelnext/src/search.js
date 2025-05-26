load('config.js');
function execute(key) {
    let response = fetch(BASE_URL + "/search?keyword=" + key);
    console.log(BASE_URL + "/search?keyword=" + key)
    if (response.ok) {
        let doc = response.html();
        let novelList = [];

        doc.select("#list-page > div.col-xs-12.col-sm-12.col-md-9.col-novel-main.archive .row").forEach(e => {
            novelList.push({
                name: e.select(".novel-title a").text(),
                link: e.select(".novel-title a").first().attr("href"),
                description: e.select(".author").text(),
                cover: e.select(".cover").attr("src"),
                host: BASE_URL,
            });
        });

        return Response.success(novelList);
    }
    return null;
}


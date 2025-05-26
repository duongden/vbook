load('config.js');
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let el1 = doc.select("#list").last().select("dd a");
        for (let i = 9; i < el1.size(); i++) {
            var e = el1.get(i);
            data.push({
                name: e.select("a").text(),
                url: BASE_URL + e.attr("href"),
                host: BASE_URL
            })
        }
        return Response.success(data);
    }
    return null;
}
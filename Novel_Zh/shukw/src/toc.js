load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url + "/");
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#list > dl").last()
        doc.select("#list > dl > dt:nth-child(14)").remove()
        doc.select("#list > dl > dt > a").remove()
        let el = el1.select("a")
        const data = [];
        let count = 0;
        if (el.size() > 12)
            count = 12;

        for (let i = count; i < el.size(); i++) {
            var e = el.get(i);
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
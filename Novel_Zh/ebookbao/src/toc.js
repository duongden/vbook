load('config.js');
function execute(url) {
    let newurl = url + "/all.html";
    let response = fetch(newurl);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#chapterlist").last()
        doc.select('p a[style*=\"color:Red;\"]').remove();
        let el = el1.select("p a")
        const data = [];
        for (let i = 0; i < el.size(); i++) {
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
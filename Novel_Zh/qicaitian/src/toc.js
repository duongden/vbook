function execute(url) {
    if (url.slice(-1) !== "/")
        url = url + "/";
    url = url.replace('m.qicaitian.org', 'www.qicaitian.org');
    console.log(url)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("#content_1 a")
        const data = [];
        for (let i = 0; i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: "https://www.qicaitian.org" + e.attr("href"),
                host: "https://www.qicaitian.org"
            });

        }
        return Response.success(data);
    }
    return null;
}
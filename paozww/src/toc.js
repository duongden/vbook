function execute(url) {
	url = url.replace('m.paozww.com', 'www.paozww.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#list").last()
        let el = el1.select("dd a")
        const data = [];
        for (let i = 9;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: e.attr("href"),
                host: "http://www.paozww.com"
            })
        }
        return Response.success(data);
    }
    return null;
}
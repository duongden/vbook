function execute(url) {
	url = url.replace('m.51kenshu.com', 'www.51kenshu.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".listmain").last()
        let el = el1.select("dd a")
        const data = [];
        for (let i = 5;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"http://www.51kenshu.com" + e.attr("href"),
                host: "http://www.51kenshu.com"
            })
        }
        return Response.success(data);
    }
    return null;
}
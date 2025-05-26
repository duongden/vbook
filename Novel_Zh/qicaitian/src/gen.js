function execute(url) {
    url = url.replace('m.qicaitian.com', 'www.qicaitian.com');
    let response = fetch("https://www.qicaitian.org" + url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".l li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text(),
                link: "https://www.qicaitian.org" + e.select(".s2 a").first().attr("href"),
                description: e.select(".s3 a").first().text(),
                host: "https://www.qicaitian.org"
            })
        });
        return Response.success(data)
    }
    return null;
}
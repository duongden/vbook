function execute(url, page) {
	url = url.replace('m.51kenshu.com', 'www.51kenshu.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".up .l ul li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text(),
                link: e.select(".s2 a").first().attr("href"),
                description: e.select(".s3 a").first().text(),
                host: "http://www.51kenshu.com"
            })
        });


        return Response.success(data)
    }
    return null;
}
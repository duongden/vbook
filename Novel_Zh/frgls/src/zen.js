load('config.js');
function execute(url, page) {
    if(!page) page = '1';
    let response = fetch(BASE_URL + "/json?sortid=" + url + "&page=" + page);
    if (response.ok) {
        let doc = response.json();
        const data = [];
		doc.forEach(e => {
            data.push({
                name: e.articlename,
                link: e.url_list,
                cover: e.url_img,
                description: e.author,
                host: BASE_URL
            })
        });
		if (data.length === 0) {
			doc.select(".hot div.item").forEach(e => {
                var coverImg = e.select(".image img").first().attr("src");
                console.log(coverImg)
                data.push({
                    name: e.select("a").last().text(),
                    cover: coverImg,
                    link: e.select(".image a").first().attr("href"),
                    description: e.select("dd").first().text(),
                    host: BASE_URL
                })
            }
            );
		}
        let next = (parseInt(page) + 1).toString();
        return Response.success(data,next)
    }
    return null;
}
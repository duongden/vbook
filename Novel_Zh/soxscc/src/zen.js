load('config.js');
function execute(url, page) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (!page) page = '2';
    let response = fetch(BASE_URL + url + page + ".html");
    console.log(BASE_URL + url + page + ".html")
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select("#main > div.novelslist2 > ul > li:nth-child(1)").remove();
		doc.select(".novelslist2 li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text(),
                link: BASE_URL + e.select(".s2 a").first().attr("href"),
                description: e.select(".s4").first().text(),
                host: BASE_URL
            })
        });
        let next = doc.select("a:contains(下一页)").first().attr("href").slice(0, -1).split(/[/ ]+/).pop().replace(".html","").replace(".htm","")
        return Response.success(data, next)
    }
    return null;
}

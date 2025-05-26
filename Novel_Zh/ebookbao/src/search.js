load('config.js');
function execute(key) {
   // url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(BASE_URL + '/search.php?keyword=+' + key);

    if (response.ok) {
        let doc = response.html();
        const data = [];
        console.log(doc)
		doc.select(".list1 .hot_sale").forEach(e => {
            let author = e.select("p.author a").first().text();
            data.push({
                name: e.select("p.title").first().text(),
                link: BASE_URL + e.select(".hot_sale a").first().attr("href"),
                description: author.replace("/","").trim(),
                host: BASE_URL
            })
        });

        return Response.success(data);
    }
    return null;
}
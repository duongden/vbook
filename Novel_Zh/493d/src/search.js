function execute(key) {
    let response = fetch('https://www.493d.com/modules/article/search.php?searchkey=' + key);

    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".j_list_container .lh1d5 li").forEach(e => {
            let author = e.select(".mr10").last().text();
            data.push({
                name: e.select("h3 a").first().text(),
                link: e.select("h3 a").first().attr("href"),
                description: "Tác giả: " + author,
                host: "https://www.493d.com"
            })
        });
        return Response.success(data);
    }
    return null;
}
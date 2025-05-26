load('config.js');

function execute(url, page) {
    if (!page) page = '1';
    let response = fetch(BASE_URL + url + "-p" + page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select(".close_not_qc").remove();
        doc.select("article.item-news.thumb-left").forEach(e => {
            let img = e.select("img");
            let source = e.select("source");
            let cover;
            if (img.length > 0) {
                cover = img.attr("data-srcset") || img.attr("srcset") || img.attr("data-src") || img.attr("data-src-image") || img.attr("src");
            } else if (source.length > 0) {
                cover = source.attr("data-srcset") || source.attr("srcset") || source.attr("data-src") || source.attr("data-src-image") || source.attr("src");
            }
            let title = e.select("h3.title-news a").first().text().trim();

            // Trim the title
            let trimmedTitle = title.length > 40 ? title.substring(0, 40) + "..." : title;

            data.push({
                name: trimmedTitle,
                cover: cover,
                link: e.select("h3.title-news a").first().attr("href"),
                description: null,
                host: BASE_URL
            });
        });
        var next = (parseInt(page) + 1).toString();
        return Response.success(data, next);
    }
    return null;
}

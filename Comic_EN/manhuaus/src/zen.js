function execute(url, page) {
    if (!page) page = 1;
    const doc = Http.get("https://manhuaus.com/manga-genre" + url).params({ paged: page }).html();
    const el = doc.select(".page-listing-item .page-item-detail");
    const data = [];
    
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        data.push({
            name: e.select(".h5 a").first().text(),
            link: e.select(".h5 a").first().attr("href"),
            cover: e.select(".c-image-hover img").first().attr("data-src"),
            description: "",
            host: "https://manhuaus.com"
        });
    }

    var next = null;

    // Check if the number of items fetched is more than 12
    if (el.size() >= 12) {
        next = (parseInt(page) || 1) + 1;
    }

    return Response.success(data, next ? next.toString() : null);
}

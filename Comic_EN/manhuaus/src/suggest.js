function execute(input) {
    let doc = Html.parse(input);
    let books = [];
    doc.select(".popular-item-wrap").forEach(e => {
        books.push({
            name: e.select(".widget-title a").text(),
            link: e.select(".widget-title a").attr("href"),
            cover: e.select(".c-image-hover img").first().attr("data-src"),
            description: "",
            host: "https://manhuaus.com",
        })

    });

    return Response.success(books);

}
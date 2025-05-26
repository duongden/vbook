load('config.js');
function execute(data) {
    let doc = Html.parse(data);
    let books = [];
    doc.select("a").forEach(e => {
        if (e.text().trim() !== '') { // Check if the <a> has non-empty text
            books.push({
                name: e.text(),
                link: BASE_URL + e.attr("href"),
                description: e.select(".book-author").text(),
                host: BASE_URL
            });
        }
    });
    return Response.success(books);
}
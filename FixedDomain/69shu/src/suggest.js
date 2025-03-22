load("config.js");

function execute(input, page) {
    let response = fetch(BASE_URL + input);
    if (response.ok) {
        let doc = response.html('gbk');
        let keywords = doc.select(".newbox ul li");
        console.log(keywords);
        let next = doc.select(".next").first().attr("href")
        let books = []
        keywords.forEach(book => {
            books.push({
                name: book.select(".newnav h3").text(),
                link: book.select(".newnav h3 a").first().attr("href"),
                description: book.select(".ellipsis_2").text(),
                host: BASE_URL
            })
        });
        return Response.success(books, next);
    }
    return null;
}

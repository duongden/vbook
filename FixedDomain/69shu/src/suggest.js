load("config.js");

function execute(input, page) {
    let response = fetch(BASE_URL+input);
    if (response.ok) {
        let doc = response.html();
        let booksList = doc.select(".mybox ul li");
        console.log(booksList);
        let next = doc.select(".next").first().attr("href")
        let books = [];
        booksList.forEach(book => {
            books.push({
                name: book.select(".newnav h3 a").text(),
                link: book.select(".newnav h3 a").attr("href"),
                cover: book.select("img").attr("data-src"),
                description: book.select(".ellipsis_2").text().trim(),
                host: BASE_URL // Ensure BASE_URL is defined
            });
        });
        return Response.success(books, next);
    }
    return null;
}

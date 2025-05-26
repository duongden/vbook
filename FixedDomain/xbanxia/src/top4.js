load("config.js");

function execute(url, page) {
    let response = fetch(BASE_URL + url + ".html");

    if (response.ok) {
        let doc = response.html();
        let books = [];
        doc.select("#content-list ol li.pop-book2").forEach(e => {
            books.push({
                name: e.select("a h2").last().text(),
                link: e.select("a").last().attr("href"),
                cover: e.select("a img").attr("data-original"),
                description: e.select("span.pop-intro").text(),
                host: BASE_URL
            })
        });

        return Response.success(books);
    }

    return null;
}
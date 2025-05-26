load('config.js');
function execute(url) {
  //  url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url + "/");
    if (response.ok) {
        let doc = response.html();

        let coverImg = doc.select("#thumb img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = BASE_URL + coverImg;
        }
        let author = doc.select(".author a").first().text();
        return Response.success({
            name: doc.select(".title").text(),
            cover: coverImg,
            author: author,
            detail: "Tác giả: " + author + "<br>" + doc.select("li.sort").text() + "<br>" + doc.select("#book_detail > li:nth-child(3)").text() + "<br>" + doc.select("#book_detail > li:nth-child(4)").text().replace(/\d\d:\d\d:\d\d/g, "") + "<br>",
            description: doc.select(".review").text(),
            host: BASE_URL
        });
    }
    return null;
}
// 
load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let author = doc.select("div.book-describe p a").text()
        let cover = doc.select('meta[property="og:image"]').attr("content")
        let descriptionMeta = doc.select('meta[name="description"]').attr("content")
        let newChap = doc.select("div.book-describe p a").text()
        // let updateTime = doc.select("div.book-describe p").text()
        return Response.success({
            name: doc.select("div.book-describe h1").text(),
            cover: cover,
            author: author,
            description: descriptionMeta,
            detail: "Tác giả: " + author + '<br>' + "Chương mới nhất: " + newChap  + '<br>',
            host: BASE_URL
        });
    }
    return null;
}
load('config.js');
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select('meta[property="og:image"]').attr("content");
        let descriptionMeta = doc.select("h2").text();
        let title = doc.select('meta[property="og:title"]').attr("content");
        let author = doc.select('meta[property="article:author"]').attr("content");

        return Response.success({
            name: title,
            cover: coverImg,
            author: author,
            description: descriptionMeta,
            detail: author,
            host: BASE_URL
        });
    }
    return null;
}
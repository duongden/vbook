load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select('meta[property="og:image"]').attr("content");
        let author = doc.select('meta[property="og:novel:author"]').attr("content");
        let category = doc.select('meta[property="og:novel:category"]').attr("content");
        let descriptionMeta = doc.select('meta[property="og:description"]').attr("content").replace("    ","<br>");
        return Response.success({
            name: doc.select("#info h1").text(),
            cover: coverImg,
            author: author,
            description: descriptionMeta,
            detail: "Tác giả: " + author  + '<br>' +  ("Thể loại: ") + category + '<br>' + doc.select("#info > p:nth-child(5)").text()  + '<br>' + doc.select("#info > p:nth-child(4)").text().replace(/\d\d:\d\d:\d\d/g, ""),
            host: BASE_URL
        });
    }
    return null;
}
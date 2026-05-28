load("config.js");

function execute(url) {
    var id = bookIdFromUrl(url);
    if (id) url = bookUrl(id, 1);
    var response = fetchDoc(url);
    if (!response.ok) return null;

    var doc = response.html();
    var name = cleanText(doc.select('meta[property="og:novel:book_name"]').attr("content")) || cleanText(doc.select(".detail-box h1").text());
    var author = cleanText(doc.select('meta[property="og:novel:author"]').attr("content"));
    var category = cleanText(doc.select('meta[property="og:novel:category"]').attr("content"));
    var status = cleanText(doc.select('meta[property="og:novel:status"]').attr("content"));
    var update = cleanText(doc.select('meta[property="og:novel:update_time"]').attr("content"));
    var latest = cleanText(doc.select('meta[property="og:novel:lastest_chapter_name"]').attr("content"));
    var cover = cleanText(doc.select('meta[property="og:image"]').attr("content")) || doc.select(".detail-box img").attr("src");
    var desc = cleanText(doc.select(".detail-box .desc").text()) || cleanText(doc.select(".m-desc").text()) || cleanText(doc.select('meta[property="og:description"]').attr("content"));

    return Response.success({
        name: name,
        cover: absUrl(cover),
        author: "Tác giả: " + author,
        description: desc,
        detail: "Thể loại: " + category + "<br>Tình trạng: " + status + "<br>Mới nhất: " + latest + "<br>Cập nhật: " + update,
        host: BASE_URL
    });
}


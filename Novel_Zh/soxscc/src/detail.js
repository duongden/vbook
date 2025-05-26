load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let title = doc.select('meta[property="og:novel:book_name"]').attr("content");
        let author =  doc.select("#info p").first().text().replace(/作\s*者：/g, "");
        let category = doc.select('meta[property="og:novel:category"]').attr("content");
        let updateTime = doc.select('meta[property="og:novel:update_time"]').attr("content").replace(/\d\d:\d\d/g, "");
        let newChap = doc.select('meta[property="og:novel:latest_chapter_name"]').attr("content");
        let descriptionMeta = doc.select("#intro").html();

        return Response.success({
            name: title,
            author: author,
            description: descriptionMeta,
            detail: "Tác giả: " + author + "Thể loại: " + category + '<br>' + "Mới nhất: " + newChap  + '<br>' + "Thời gian cập nhật: " + updateTime,
            host: BASE_URL
        });
    }
    return null;
}

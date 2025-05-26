load('config.js');
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select('meta[property="og:image"]').attr("content");
        let descriptionMeta = doc.select('meta[property="og:description"]').attr("content").replace("《",'"').replace("》",'"').replace('<br>',"");
        let title = doc.select('meta[property="og:novel:book_name"]').attr("content");
        let newChap = doc.select('meta[property="og:novel:latest_chapter_name"]').attr("content");
        let author = doc.select('meta[property="og:novel:author"]').attr("content");
        let category = doc.select('meta[property="og:novel:category"]').attr("content");
        let updateTime = doc.select('meta[property="og:novel:update_time"]').attr("content").replace(/\d\d:\d\d/g, "");
         let status = doc.select('meta[property="og:novel:status"]').attr("content");

        return Response.success({
            name: title,
            cover: coverImg,
            author: author,
            description:  "Giới thiệu: " + descriptionMeta,
            detail: "Tác giả: " + author + '<br>' + "Thể loại: " + category + '<br>' + "Tình trạng: " + status + '<br>' + "Mới nhất: " + newChap  + '<br>' + "Thời gian cập nhật: " + updateTime,
            host: BASE_URL
        });
    }
    return null;
}
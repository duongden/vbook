load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select("#fmimg img").first().attr("data-original");
        if (coverImg.includes("nocover.jpg")) {
            coverImg = "https://raw.githubusercontent.com/duongden/vbook/main/nocover.jpg";
        }
        let descriptionMeta = doc.select('meta[property="og:description"]').attr("content").replace("r>","").replace("《",'"').replace("》",'"');

        let title = doc.select('meta[property="og:title"]').attr("content");
        let status = doc.select('meta[property="og:novel:status"]').attr("content");
        let newChap = doc.select('meta[property="og:novel:latest_chapter_name"]').attr("content");
        let author = doc.select('meta[property="og:novel:author"]').attr("content");
        let category = doc.select('meta[property="og:novel:category"]').attr("content");
        let updateTime = doc.select('meta[property="og:novel:update_time"]').attr("content").replace(/\d\d:\d\d:\d\d/g, "");
        return Response.success({
            name: title,
            cover: coverImg,
            author: author,
            description: descriptionMeta,
            detail: "Thể loại: " + category + '<br>' + "Tình trạng: " + status + '<br>' + "Mới nhất: " + newChap  + '<br>' + "Thời gian cập nhật: " + updateTime,
            host: BASE_URL
        });
    }
    return null;
}

load('config.js');
function execute(url) {
    //url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let novelTitle = doc.select('meta[property="og:novel:novel_name"]').attr("content");
        let newChap = doc.select('meta[property="og:novel:lastest_chapter_name"]').attr("content");
        let author = doc.select('meta[property="og:novel:author"]').attr("content");
        let detail = doc.select(".info-meta").html();
   

        return Response.success({
            name: novelTitle,
            cover: doc.select("div.book img").attr("src"),
            author: author,
            description: doc.select("div.desc-text").text(),
            detail: detail,
            host: BASE_URL
        });
    }
    return null;
}
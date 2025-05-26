load('libs.js');
load('config.js');

function execute(url) {
    var gbkEncode = function (s) {
        load('gbk.js');
        return GBK.encode(s);
    }

    // Chuẩn hoá URL
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    url = url.replace("/c/", "/b/");
    url = url.replace("/txt/", "/book/");

    // Lấy ID truyện
    const regex_id = /\/(\d+)\.(htm|html)/;
    let book_id = url.match(regex_id)[1];

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');

        let novelTitle = doc.select('meta[property="og:novel:book_name"]').attr("content") || "";
        let newChap = doc.select('meta[property="og:novel:latest_chapter_name"]').attr("content") || "";
        let author = doc.select('meta[property="og:novel:author"]').attr("content") || "";
        let novelCategory = doc.select('meta[property="og:novel:category"]').attr("content") || "";
        let status = doc.select('meta[property="og:novel:status"]').attr("content") || "";
        let updateTime = (doc.select('meta[property="og:novel:update_time"]').attr("content") || "").replace(/\d\d:\d\d:\d\d/g, "");

        // ✅ Dựng cover đúng domain static
        let cover = String.format(
            '{0}/files/article/image/{1}/{2}/{2}s.jpg',
            CDN_URL,
            Math.floor(book_id / 1000),
            book_id
        );

        return Response.success({
            name: novelTitle,
            cover: cover,
            author: author,
            description: doc.select(".navtxt").html(),
            detail: "Thể loại: " + novelCategory + '<br>' +
                    "Tình trạng: " + status + '<br>' +
                    "Mới nhất: " + newChap + '<br>' +
                    "Thời gian cập nhật: " + updateTime,
                    suggests: [
                        {
                            title: "Cùng tác giả",
                            input: "/modules/article/author.php?author=" + gbkEncode(author),
                            script:"suggest.js"
                        }
                    ],
            host: BASE_URL
        });
    }
    return null;
}

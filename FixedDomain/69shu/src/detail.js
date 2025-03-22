load('libs.js');
load('config.js');

function execute(url) {
    var gbkEncode = function (s) {
        load('gbk.js');
        return GBK.encode(s);
    }

    // Đặt BASE_URL theo domain xuất hiện trong url gốc
    if (url.indexOf("69shuba.com") !== -1) {
        BASE_URL = "https://69shuba.com";
    } else {
        BASE_URL = "https://69shuba.cx";
    }

    // Thay thế domain và đường dẫn theo BASE_URL
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    url = url.replace("/c/", "/b/");
    url = url.replace("/txt/", "/book/");

    // Định nghĩa regex để lấy ID sách và bỏ 3 chữ số cuối
    const regex_id = /\/(\d+)\.(htm|html)/; // Lấy toàn bộ số
    const regex_id2 = /\/(\d+)(\d{3})\.(htm|html)/; // Bỏ 3 chữ số cuối
    // Lấy book_id và book_id2 từ URL
    let book_id = url.match(regex_id)[1];
    let book_id2 = url.match(regex_id2)[1];
    console.log(url);

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let novelTitle = doc.select('meta[property="og:novel:book_name"]').attr("content") || "";
        let newChap = doc.select('meta[property="og:novel:latest_chapter_name"]').attr("content") || "";
        let author = doc.select('meta[property="og:novel:author"]').attr("content") || "";
        let novelCategory = doc.select('meta[property="og:novel:category"]').attr("content") || "";
        let status = doc.select('meta[property="og:novel:status"]').attr("content") || "";
        let updateTime = (doc.select('meta[property="og:novel:update_time"]').attr("content") || "").replace(/\d\d:\d\d:\d\d/g, "");

        return Response.success({
            name: novelTitle,
            cover: BASE_URL + "/bimages/" + book_id2 + "/" + book_id + "/" + book_id + "s.jpg",
            author: author,
            description: doc.select(".jianjie-popup .content").text(),
            detail: "Thể loại: " + novelCategory + '<br>' +
                "Tình trạng: " + status + '<br>' +
                "Mới nhất: " + newChap + '<br>' +
                "Thời gian cập nhật: " + updateTime,
            suggests: [{
                title: "Cùng tác giả",
                input: "/modules/article/author.php?author=" + gbkEncode($.Q(doc, 'div.booknav2 > p').text().replace("作者：", "")),
                script: "suggest.js"
            }],
            host: BASE_URL
        });
    }
    return null;
}
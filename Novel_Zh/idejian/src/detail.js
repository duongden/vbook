load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (url.slice(-1) !== "/")
        url = url + "/";
        let response = fetch(url);
        if (response.ok) {
            let doc = response.html();
            ///// ELEMENT INFO TRUYEN /////
            let author = doc.select(".detail_bkauthor").first().text();
            let title = doc.select(".detail_bkinfo .detail_bkname a").text();
            let coverImg = doc.select(".detail_bkinfo .book_img > img").attr("src");
            let category = doc.select(".detail_bkgrade > span:nth-child(2)").html().replace(/<span>/g, '<br>');
            let tag = doc.select(".detail_bkgrade").last().html().replace(/<span>/g, '<br>');
            let descriptionMeta = doc.select(".bk_brief .brief_con").html();
            let status = doc.select(".detail_bkgrade > span.light_box").html();
            let views = doc.select(".bk_fontinfo").html().replace(/<span>/g, '<br>');
            let rating = doc.select(".detail_bkinfo_rig strong").text();

            let detail = `Tác giả: ${author}<br>Thể loại: ${category}<br>ㅤ‎<br>Tag: ${tag}<br>‎<br>Trạng thái: ${status}<br>‎<br>Lượt view/thích: ${views}<br>ㅤ‎<br>Đánh giá: ${rating}`;
            ///// LOAD INFO TRUYEN /////
            return Response.success({
                name: title,
                cover: coverImg,
                author: author,
                description: descriptionMeta, //// phần giới thiệu chỗ detail
                detail: detail, //// phần thông tin chỗ detail
                host: BASE_URL
            });
        }
        return null;
    }
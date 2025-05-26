load('config.js');
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select('meta[property="og:image"]').attr("content");
        let descriptionMeta = doc.select(".content-detail-sapo").text();
        let title = doc.select('meta[property="og:title"]').attr("content");
       // body > div.wrapper > div.main-v1.bg-white > div:nth-child(1) > div.container__left.not-pl > div.bread-crumb-detail.sm-show-time > ul > li:nth-child(2) > a
        let category = doc.select('div.bread-crumb-detail.sm-show-time > ul > li:nth-child(2) > a').text();
        let updateTime = doc.select('.bread-crumb-detail__time').text();

        return Response.success({
            name: title,
            cover: coverImg,
           // author: author,
            description: descriptionMeta,
            detail: "Danh mục: " + category + '<br>' + "Thời gian cập nhật: " + updateTime,
            host: BASE_URL
        });
    }
    return null;
}
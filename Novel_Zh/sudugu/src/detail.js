load('config.js');

function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".item > a > img").first().attr("src");
        let charNums = doc.select("div.item > div > h1 > i").first().text();
        let status = doc.select("div.item > div > p:nth-child(2) > span:nth-child(1)").first().text();
        let category = doc.select("div.item > div > p:nth-child(2) > span:nth-child(2)").first().text();
        let views = doc.select("div.item > div > p:nth-child(2) > span:nth-child(3)").first().text();
        console.log(coverImg)
        if (coverImg.startsWith("/")) {
            coverImg = BASE_URL + coverImg;
        }
        let author = doc.select("div.item > div > p:nth-child(3) > a").first().text();
        return Response.success({
            name: doc.select(".itemtxt > h1 > a").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".des.bb").first().text(),
            detail: author + '<br>' + "Thể loại: " + category + '<br>' + "Tình trạng: " + status + '<br>' + "Số chữ: " + charNums + '<br>' + "Lượt đọc: " + views,
            host: BASE_URL
        });
    }
    return null;
}
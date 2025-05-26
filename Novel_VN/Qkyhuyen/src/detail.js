load('config.js');

const execute = function(url) {
    const doc = Http.get(url).html();
    if (!doc) return null;
    const nameOrg = doc.select("div.media-body h2.text-success").text().trim();
    const name = doc.select("div.media-body h1").text().trim();
    const author = doc.select("p:contains(Tác giả) a").text();
    const category = doc.select("p:contains(Phân loại) a").text();
    const country = doc.select("p:contains(Quốc gia) a").text();
    const age = doc.select("p:contains(Độ tuổi) a").text();
    const poster = doc.select("p:contains(Người đăng) span").text();
    const lastChapter = doc.select("p:contains(Mới nhất) a").text();
    const lastUpdate = doc.select("p:contains(Cập nhật) span").text();

    const status = doc.select("div.story-stage > p").text().replace("(", "").replace(")", "");

    // Số chương & lượt xem
    const stats = doc.select("p.text-muted");
    const chapterCount = stats.select("span.abbr").first().text();
    const viewCount = stats.select("span.abbr").get(1).text();

    const coverImg = doc.select(".story-thumb img").attr("src");

    const genres = [];
    doc.select("div.media-body p:contains(Phân loại) a").forEach(e => {
        genres.push({
            title: e.text(),
            input: e.attr("href").startsWith("http") ? e.attr("href") : BASE_URL + e.attr("href"),
            script: "gen.js"
        });
    });

    const description = doc.select(".para").html();

    const detail =
        "Tên gốc: " + nameOrg + "<br>" +
        "Tác giả: " + author + "<br>" +
        "Tình trạng: " + status + "<br>" +
        "Phân loại: " + category + "<br>" +
        "Quốc gia: " + country + "<br>" +
        "Độ tuổi: " + age + "<br>" +
        "Người đăng: " + poster + "<br>" +
        "Chương mới nhất: " + lastChapter + "<br>" +
        "Cập nhật: " + lastUpdate + "<br>" +
        "Số chương: " + chapterCount + "<br>" +
        "Lượt xem: " + viewCount;

    return Response.success({
        name: name,
        cover: coverImg.startsWith("http") ? coverImg : BASE_URL + coverImg,
        author: author,
        genres: genres,
        description: description,
        detail: detail,
        suggests: [
            {
                title: "Truyện tương tự",
                input: doc.select(".story-list").html(),
                script: "similar.js"
            }
        ],
        host: BASE_URL
    });
}

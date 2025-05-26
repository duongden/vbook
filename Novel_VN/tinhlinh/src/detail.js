load('config.js');
function execute(url) {
    var doc = Http.get(url).html();
    if (doc) {

        let author =  doc.select('meta[property="book:author"]').attr("content");
        let coverImg =  doc.select(".story-thumb img").attr("src");
        let category = doc.select('meta[name="keywords"]').attr("content").replace(/,/g, ", ");
        let genres = [];
        doc.select(".story-tags a").forEach(e => {
            genres.push({
                title: e.text(),
                input: BASE_URL + e.attr("href"),
                script: "gen.js"
            });
        });
        return Response.success({
            name: doc.select("div.media-body h1").text(),
            cover: coverImg,
            genres: genres,
            host: BASE_URL,
            author: author,
            description: doc.select(".para").html(),
            detail: "Tác giả: " + author + '<br>' + "Tình trạng: " + doc.select("div.story-stage > p").text().replace("(","").replace(")","") + '<br>' + doc.select("div.media-body > p:nth-child(5)").text(),
        });
    }
    return null;
}

load('config.js');
function execute(url) {
    //url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(BASE_URL + url);

    if (response.ok) {
        let doc = response.html();
        const data = [];

		doc.select("#newscontent li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text().replace("《","").replace("》",""),
                link: BASE_URL + e.select(".s2 a").first().attr("href"),
                description: "Chương mới: " + e.select(".s3 a").first().text(),
                host: BASE_URL
            })
        });
        return Response.success(data)
    }
    return null;
}
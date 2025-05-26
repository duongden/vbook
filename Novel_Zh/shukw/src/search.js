load('config.js');
function execute(key) {

    let response = fetch(BASE_URL + '/search/', {
        method: "GET",
        queries: {
            searchkey: key,
        }
    });

    if (response.ok) {
        let doc = response.html();

        const data = [];

        doc.select(".item").forEach(e => {
        let coverImg = "https://raw.githubusercontent.com/duongden/vbook/main/nocover.jpg";
            data.push({
                name: e.select("dl dt a").first().text(),
                link: e.select("dl dt a").first().attr("href"),
                cover: coverImg,
                description: e.select("dl dd").first().text().replace(/\//g, "").trim(),
                host: BASE_URL
            })
        });

        return Response.success(data);
    }
    return null;
}
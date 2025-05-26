load('config.js');
function execute(url, page) {
    if (!page) page = '1';

    let response = fetch(BASE_URL + url + "/" + page);
    console.log(BASE_URL + url + "/" + page)
    if (response.ok) {
        let doc = response.html();
        const data = [];

        doc.select(".home-list .hlb-t").forEach(e => {
            let coverImg = "https://raw.githubusercontent.com/duongden/vbook/main/coverComicGeneral.png"
            data.push({
                name: e.select("a.hlb-name").first().text(),
                link: e.select("a.hlb-name").first().attr("href"),
                cover: coverImg,
                description: "Updated: " + e.select(".date").first().text(),
                host: BASE_URL
            })
        });
        var next = (parseInt(page)+1).toString();
        return Response.success(data, next);
    }
    return null;
}
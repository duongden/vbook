load('config.js');
function execute(url) {

    let response = fetch(BASE_URL + url);
    console.log(BASE_URL + url);

    if (response.ok) {
        let doc = response.html();
        const data = [];

        doc.select(".item").forEach(e => {
            const titleEl = e.select("h1 a, h3 a").first();  // Lấy a trong h1 hoặc h3
            const imgEl = e.select("a > img").first();
            const descEl = e.select("div > p:nth-child(3) > a").first();

            data.push({
                name: titleEl ? titleEl.text().replace("《", "").replace("》", "") : "",
                link: titleEl ? BASE_URL + titleEl.attr("href") : "",
                cover: imgEl ? 'https:' + imgEl.attr("src") : "",
                description: descEl ? descEl.text() : "",
                host: BASE_URL
            });
        });

        return Response.success(data);
    }
    return null;
}

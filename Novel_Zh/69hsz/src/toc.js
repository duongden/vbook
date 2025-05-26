load('config.js');
function execute(url) {
    // Sửa URL theo BASE_URL
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let el = doc.select("#list dl a[rel='chapter']");
        for (let i = 8; i < el.size(); i++) {
            let e = el.get(i);
            data.push({
                name: e.select("dd").text(),
                url: BASE_URL + e.attr("href"),
                host: BASE_URL
            });
        }
        return Response.success(data);
    }
    return null;
}

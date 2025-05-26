load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        let json = response.json();
        let html = json.html;
        html = Html.parse(html);
        let el = html.select("li a");
        let data = []
        for (let i = 0; i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.text(),
                url: BASE_URL + e.attr("href"),
                host: BASE_URL
            });

        }
        return Response.success(data);
    }
    return null;
}
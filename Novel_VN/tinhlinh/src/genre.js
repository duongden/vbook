load('config.js');

function execute() {
    let response = fetch(BASE_URL);
    if (!response.ok) {
        return null;
    }
    let doc = response.html();

    const result = [];
    doc.select(".sidebar-tags a").forEach(function (e) {
        const title = e.text().trim();
        const href = e.attr("href");

        result.push({
            title: title,
            input: href,
            script: "gen.js"
        });
    });

    return Response.success(result);
}

load('config.js');

function execute() {
    let response = fetch(BASE_URL);
    if (!response.ok) {
        return null;
    }

    let doc = response.html();
    const result = [];

    // Chọn phần thể loại trong sidebar có tiêu đề là "Thể loại"
    let block = doc.select('div.blog-sidebar_block.sidebar-tags:has(h2:contains(Thể loại))');

    block.select('a').forEach(function (e) {
        const title = e.text().replace(/\s*\d+\s*$/, "").trim(); // bỏ số trong <small>
        const href = e.attr("href");

        result.push({
            title: title,
            input: href,
            script: "gen.js"
        });
    });

    return Response.success(result);
}

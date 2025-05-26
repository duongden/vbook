load('config.js');
function execute() {
    const doc = Http.get(BASE_URL).html();
    const el = doc.select(".header__nav a.nav-link");
    const data = [];
    for (var i = 1; i < el.size(); i++) {
        var e = el.get(i);
        data.push({
           title: e.text(),
           input: e.attr('href'),
           script: 'zen2.js'
        });
    }
    // Filter out the "Video" entry
    const filteredData = data.filter(item => item.title !== "Phụ nữ" && item.title !== "Địa ốc");

    return Response.success(filteredData);
}
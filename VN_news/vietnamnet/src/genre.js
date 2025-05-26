load('config.js');
function execute() {
    const doc = Http.get(BASE_URL).html();
    const el = doc.select("ul.sub__menu > li a");
    const data = [];
    for (var i = 1; i < el.size(); i++) {
        var e = el.get(i);
        data.push({
           title: e.text(),
           input: e.attr('href'),
           script: 'gen.js'
        });
    }
    return Response.success(data);
}
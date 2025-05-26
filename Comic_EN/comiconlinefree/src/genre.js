load('config.js');
function execute() {
    let response = fetch(BASE_URL + "/comic-genres");
    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select('.title').remove();
        doc.select('.date-title').remove();
        doc.select('.home-list .hlb-t a').forEach(e => {
            data.push({
                title: e.select('a.hlb-name').text(),
                input: e.attr('href'),
                script: 'zen.js'
            });
        });
        return Response.success(data);
    }
    return null;
}
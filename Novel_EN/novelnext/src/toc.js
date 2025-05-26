load('config.js');
function execute(url) {
    let book_id = url.split(/[/ ]+/).pop();
    let response = fetch(BASE_URL + '/ajax/chapter-archive?novelId=' + book_id);
    console.log(BASE_URL + '/ajax/chapter-archive?novelId=' + book_id);
    if (response.ok) {
        let doc = response.html();
        let chapList = [];
        doc.select(".list-chapter li a").forEach(e => {
            chapList.push({
                name: e.text(),
                url: e.attr("href"),
                host: BASE_URL
            });
        });
        return Response.success(chapList);
    }
    return null;
}
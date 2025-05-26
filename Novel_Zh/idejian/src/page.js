load('config.js');
function execute(url) {
    let response = fetch(url)
    if (response.ok) {
        const data = [];
        let doc = response.html();
        let nav = doc.select(".detail_tab_nav a").last().text();
        const match = nav.match(/((\d+)章)/);
        const number = match ? parseInt(match[1]) : 1;
        let bookId = url.trim().replace(/\/$/, '').split(/[/ ]+/).pop();
        for (let i = 1; i <= Math.ceil(number / 50); i++) {
            data.push(BASE_URL + "/catelog/" + bookId + "/1?page=" + i.toString())
        }
        return Response.success(data);
    }
    return null;
}
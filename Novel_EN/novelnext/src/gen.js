load('config.js');
function execute(url, page) {
    if (!page) {
        page = '1';
    }
    let response = fetch(BASE_URL + url + "?page=" + page);
    if (response.ok) {
        let doc = response.html();
        let novelList = [];
        let next = '';
        let nextElement = doc.select(".pagination > li.active + li").last().select('a');
        if (nextElement.size() > 0) {
            let nextPageLink = nextElement.attr('href');
            const match = nextPageLink.match(/page=(\d+)/);
            if (match && match[1]) {
                next = match[1];
            }
        }
        doc.select("div.col-xs-12.col-sm-12.col-md-9.col-novel-main.archive .list-novel .row").forEach(e => {
            novelList.push({
                name: e.select(".novel-title a").text(),
                link: e.select(".novel-title a").first().attr("href"),
                description: e.select(".author").text(),
                cover: e.select(".cover").attr("src"),
                host: BASE_URL,
            });
        });
        // Check if there's only one page
        if (next === '1' || next === '0') {
            next = ''; // Set next to empty to indicate no more pages
        }
        return Response.success(novelList, next);
    }
    return null;
}

load('config.js');

function execute(url, page) {
    if (!page) page = '1';

    var fullUrl = url.indexOf("http") === 0 ? url : BASE_URL + url;
    var hasPageParam = fullUrl.indexOf("page=") !== -1;

    fullUrl = hasPageParam
        ? fullUrl.replace(/page=\d+/, "page=" + page)
        : fullUrl + (fullUrl.indexOf("?") > -1 ? "&" : "?") + "page=" + page;

    var response = fetch(fullUrl, { method: 'GET' });
    if (!response.ok) return null;

    var doc = response.html();
    var pagination = doc.select('.pagination').first();
    var next = pagination ? pagination.select('li.active + li').text() : null;

    var data = [];
    doc.select(".story-list div.media.m-b-30").forEach(function(e) {
        data.push({
            name: e.select(".media-heading a").first().text(),
            link: e.select(".media-heading a").first().attr("href"),
            cover: BASE_URL + e.select(".story-thumb img.media-object").attr("src"),
            description: e.select("div.media-body > p:nth-child(3) > a").text(),
            host: BASE_URL
        });
    });

    return Response.success(data, next);
}

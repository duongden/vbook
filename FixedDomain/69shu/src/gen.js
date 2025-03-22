load('libs.js');
load('config.js');

function execute(url, page) {
    page = page || '1';
    url = String.format(BASE_URL + url, page);
    console.log(url)
    // log(url);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        var data = [];
        var elems = $.QA(doc, 'li');
        if (!elems.length) return Response.error(url);
        elems.forEach(function (e) {
            var link = $.Q(e, 'h3 > a').attr('href');
            var m, id, cover;
            if ((m = link.match(BASE_URL + /.+\/(book|b)\/(.*?)\.(htm|html)/)) && m[1] && (id = m[1])) {
                cover = String.format('{0}/files/article/image/{1}/{2}/{3}s.jpg', "https://cdn.shucdn.com", Math.floor(id / 1000), id, id);
            }
            data.push({
                name: $.Q(e, '.newnav h3 > a:not([class])').text().trim(),
                link: link,
                cover: cover || '',
                description: $.Q(e, '.a', 1).text(),
                host: BASE_URL
            })
        })
        var next = parseInt(page,
            10) + 1;
        return Response.success(data,
            next.toString());
    }
    return null;
}
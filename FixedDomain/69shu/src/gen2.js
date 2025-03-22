load('libs.js');
load('config.js');

function execute(url, page) {
    url = String.format(BASE_URL + "/newtag" + url);
    console.log(url);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        var data = [];
        var elems = doc.select("ul#article_list_content li");

        elems.forEach(function(e) {
            var link = e.select("h3 a").attr('href');
            var m = link.match(/\/(?:book|b)\/(\d+)\.htm/);
            var id = m ? m[1] : null;
            var cover = id
                ? String.format('{0}/files/article/image/{1}/{2}/{3}s.jpg', CDN_URL, Math.floor(id / 1000), id, id)
                : '';

            data.push({
                name: e.select("h3").text().trim(),
                link: link,
                cover: cover,
                description: $.Q(e, '.zxzj > p').text().replace('最近章节', ''),
                host: BASE_URL
            });
        });

        return Response.success(data);
    }
    return null;
}

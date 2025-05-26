load('config.js');
function execute(url, page) {
    if (!page) {
        page = '1';
    }
    // get id category
    let response = fetch(BASE_URL + url, {
        headers: {
            'user-agent': USER_AGENT
        }
    })
    if (response.ok) {
        let doc = response.html();
        let categoryId = doc.selectXpath('//*[@id="hdZoneId"]').attr('value')
        response = fetch(BASE_URL + "/timelinelist/" + categoryId + "/" + page + ".htm", {
            headers: {
                'user-agent': USER_AGENT
            }
        })
        if (response.ok) {
            const data = [];
            doc = response.html();
            doc.select(".box-category-item").forEach(e => {
                data.push({
                    name: e.select('h3 a').text(),
                    cover: e.select('.box-category-link-with-avatar img').attr('src').trim(),
                    link: BASE_URL + e.select('h3 a').attr('href').trim(),
                    description: null,
                    host: BASE_URL
                });
            })
            var next = (parseInt(page) + 1).toString();
            return Response.success(data, next);
        }
    }
    return Response.success([{
        name: url,
        cover: '',
        link: '',
        description: null,
        host: BASE_URL
    }], 1)
    return null;
}

load('config.js');

function execute(key) {
    // https://www.juxiaoshuo.net/page/search?query=%E9%BB%91%E5%B8%86&source=15
    let response = fetch(BASE_URL + '/page/search?query=' + key + '&source=15', {
        headers: {
            'user-agent': UserAgent.android()
        }
    });

    if (response.ok) {
        let doc = response.html();
        const data = [];
        // #search-main > div.search-list > ul > li:nth-child(2)
        doc.select(".bookbox").forEach(e => {
            data.push({
                name: e.select(".bookname a").text(),
                link: BASE_URL + e.select(".bookname a").attr("href"),
                cover: BASE_URL + e.select(".bookimg img").attr("data-src"),
                description: e.select(".author").text(),
                host: BASE_URL
            });
        });
        return Response.success(data);
    }
    return null;
}

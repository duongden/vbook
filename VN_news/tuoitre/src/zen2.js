load('config.js');
function execute(url,page) {
        if (!page) {
        page = '1';
    }
    let response = fetch(BASE_URL + url + "trang-" + page + ".htm");
    console.log(BASE_URL + url + "trang-" + page + ".htm")
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select(".box-category-item").forEach(e => {
            doc.select(".adsbox").remove();

            let img = e.select("img.box-category-avatar");
            let video = e.select("video");
            let cover;

            if (img.length > 0) {
                cover = img.attr("src");
            } else if (video.length > 0) {
                cover = video.attr("poster");
            }

            data.push({
                name: e.select('h3 a').text().trim(),
                link: BASE_URL + e.select('h3 a').attr('href').trim(),
                cover: cover,
                description: null,
                host: BASE_URL
            });
        })
        var next = (parseInt(page) + 1).toString();
        return Response.success(data, next);
    }
    return null;
}
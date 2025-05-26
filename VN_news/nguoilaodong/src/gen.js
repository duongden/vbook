load('config.js');
function execute(url) {
    let response = fetch(BASE_URL + url);

    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select(".box-category-middle .box-category-item").forEach(e => {
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
                name: e.select('.box-category-title-text a').text().trim(),
                link: BASE_URL + e.select('.box-category-title-text a').attr('href').trim(),
                cover: cover,
                description: null,
                host: BASE_URL
            });
        })
      //  var next = (parseInt(page) + 1).toString();
        return Response.success(data);
    }
    return null;
}
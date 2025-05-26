load('config.js');
function execute(url, page) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if(!page) page = '1';

    let response = fetch(BASE_URL + url + page +"/");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("a:contains(>>)").first().attr("href").slice(0, -1).split(/[/ ]+/).pop()
        console.log(next)

		doc.select(".item").forEach(e => {
            let coverImg = e.select(".image img").attr("data-original");
            data.push({
                name: e.select("dl dt a").first().text().replace("《","").replace("》",""),
                link: BASE_URL + e.select("dl dt a").attr("href"),
                cover: coverImg,
                description: e.select(".btm").text(),
                host: BASE_URL
            })
        });


        return Response.success(data,next)
    }
    return null;
}
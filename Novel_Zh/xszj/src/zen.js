load('config.js');
function execute(url, page) {
   // url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
   // if(!page) page = '1';

    let response = fetch(BASE_URL + url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("#newscontent li").forEach(e => {
            data.push({
                name: e.select(".s2 a").first().text().replace("《","").replace("》",""),
                link: BASE_URL + e.select(".s2 a").attr("href"),
                description: null,
                host: BASE_URL
            })
        });


        return Response.success(data)
    }
    return null;
}
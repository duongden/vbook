function execute(key, page) {
    let response = fetch('https://www.ibiquge.info/search.html?name='+key);
    if (response.ok) {
        let doc = response.html();
        const data = [];       
        doc.select(".novelslist2 li").forEach(e => {
            if(e.select("a").first().text() !== null && e.select("a").first().text() !== '') {
                data.push({
                    name: e.select("a").first().text(),
                    link: "http://www.ibiquge.info" + e.select("a").first().attr("href"),
                    description: e.select(".s3 a").first().text(),
                    host: "http://www.ibiquge.info"
                })
            }
        }); 

        return Response.success(data);
    }
    return null;
}
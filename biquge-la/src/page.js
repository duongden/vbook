function execute(url) {
	url = url.replace('m.biquge.la', 'www.biquge.la');
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response1 = fetch(url);
    const data = [];
    if (response1.ok) {
        let doc1 = response1.html();
        let elr1 = doc1.select('select[name="pageselect"]').first().select("option");
        console.log(elr1)
        elr1.forEach((element) => {
            let url1 = "http://www.biquge.la" + element.attr("value");
            data.push(url1)
        })
        return Response.success(data);
    }
    return null;
}
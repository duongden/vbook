function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        doc.select(".ad").remove();
        let imgs = [];
        doc.select(".reading-content img").forEach(e => {
            imgs.push(e.attr("data-src"));
        })
        return Response.success(imgs);
    }
}
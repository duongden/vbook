load('config.js');
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".manga-image img").first().attr("src");
        let descriptionMeta = doc.select("p.pdesc").first().html();
        let novelTitle = doc.select(".manga-title").first().text();
        let author = doc.select("div.manga-details > table > tbody > tr:nth-child(5) > td:nth-child(2)").first().text();
        let detailHtml = doc.select(".manga-details tr").html();
        let cleanedDetailHtml = detailHtml.replace(/<span>/g, '<p>').replace(/<\/span>/g, '</p>');
        let genres = [];
        doc.select(".manga-details td a").forEach(e => {
            genres.push({
                title: e.text()
            });
        });

        return Response.success({
            name: novelTitle,
            author: author,
            cover: coverImg,
            description: descriptionMeta,
            genres: genres,
            detail: cleanedDetailHtml,
            host: BASE_URL
        });
    }
    return null;
}
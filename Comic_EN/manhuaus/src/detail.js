function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        doc.select(".rate-title").remove();
        let coverImg = doc.select('meta[property="og:image"]').attr("content");
        let descriptionMeta = doc.select(".summary__content p").first().html();
        let novelTitle = doc.select('meta[property="og:title"]').attr("content");
        let author = doc.select(".author-content").first().text();
        let rating = doc.select(".post-content").first().html();

        let genres = [];
        doc.select(".genres-content a").forEach(e => {
            genres.push({
                title: e.text()
            });
        });
        doc.select("div.tab-summary > div.summary_content_wrap > div > div.post-content > div:nth-child(6)").remove();
        return Response.success({

            name: novelTitle,
            author: author,
            cover: coverImg,
            description: descriptionMeta,
            genres: genres,
            detail: rating,
            suggests: [
                {
                    title: "Trending this month",
                    input: doc.select(".c-widget-content").html(),
                    script: "suggest.js"
                }
            ],
            host: "https://zinmanga.com"
        });
    }
    return null;
}
load('config.js');

function execute(url) {
    const data = [];
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let title = doc.select('meta[property="og:title"]').attr("content");

        data.push({
            name: title,
            url: url,
            host: BASE_URL
        });

        return Response.success(data);
    }

    return null;
}

load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    let response = fetch(url);
    if (response.ok) {
        let doc;
        let nextPart = url;
        let htm = '';
        do {
            console.log(nextPart)
            doc = fetch(nextPart).html();
            nextPart = BASE_URL + doc.select(".bottem2 a").last().attr("href");
            doc.select("#play").remove();
            doc.select(".report").remove();
            doc.select('p[style*=\"color:red;\"]').remove();
            doc.select('ins').remove();
            doc.select('script').remove();
            htm += doc.select("#booktxt");
        } while (nextPart.indexOf("page=") !== -1)
        return Response.success(cleanHtml(htm));
    }
    return null;
}
//clear rác
function cleanHtml(htm) {
    htm = htm.replace(/(<br>\s*){2,}/g, '<br>');
    htm = htm.replace(/<a[^>]*>([^<]+)<\/a>/g, '');
    htm = htm.replace(/&(nbsp|amp|quot|lt|gt);/g, "");
    htm = htm.replace(/<!--(<br \/>)?[^>]*-->/gm, '');
    htm = htm.replace(/\&nbsp;/g, "");
    htm = htm.replace("ap;ap;ldquo;ap;ap;hellip;ap;ap;hellip;ap;ap;rdquo;","")
    return htm;
}
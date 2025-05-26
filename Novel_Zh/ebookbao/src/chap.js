load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let data  ="";
    let part1 = url.replace(BASE_URL, "").replace(".html","")
    var next = part1;
    while (next.includes(part1)) {
        console.log(next)
        let response = fetch(BASE_URL + next + ".html");
        if (response.ok) {
            let doc = response.html();
            next = doc.select("a:contains(下一页)").first().attr("href").replace(".html","");
            //#chaptercontent > p:nth-child(2)
            doc.select("#chaptercontent > p").remove();
            doc.select("script").remove();
            doc.select('p a[style*=\"color:red;\"]').remove();
            let htm = doc.select(".Readarea").html();
            data = data + cleanHtml(htm);
        } else {
            break;
        }
    }
    if (data) {
        return Response.success(data);
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
    return htm;
}
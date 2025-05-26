function execute(url) {
   // url = url.replace('m.qicaitian.com', 'www.qicaitian.com');
    console.log(url)
    let data  ="";
    let part1 = url.replace("https://www.qicaitian.org", "").replace("https://www.qicaitian.org", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        console.log(next)
        let response = fetch("https://www.qicaitian.org" + next + ".html");
        if (response.ok) {
            let doc = response.html();
            next = doc.select("a[rel=\"next\"]").attr("href").replace(".html", "");
            doc.select(".posterror").remove();
            doc.select("#play").remove();
            let htm = doc.select("#booktxt").html();
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
    htm = htm.replace("本章未完，点击下一页继续阅读","");
    htm = htm.replace(/\.bqg999\.ccm\.bqg999\.cc/g, '');
    htm = htm.replace(/(<br>\s*){2,}/g, '<br>');
    htm = htm.replace(/<a[^>]*>([^<]+)<\/a>/g, '');
    htm = htm.replace(/&(nbsp|amp|quot|lt|gt);/g, "");
    htm = htm.replace(/<!--(<br \/>)?[^>]*-->/gm, '');
    htm = htm.replace(/\&nbsp;/g, "");
    return htm;
}
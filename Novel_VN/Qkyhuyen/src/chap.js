function execute(url) {
    var doc = Http.get(url).html();
    if (doc) {
        var htm = doc.select("article").html();
        return Response.success(cleanHtml(htm));
    }
    return null;
}
function cleanHtml(htm) {
    htm = htm.replace(/ƣ/g, 'ư');
    htm = htm.replace(/(^(<br>\s*)+|(<br>\s*)+$)/gm, '');
    htm = htm.replace(/(<br>\s*){2,}/gm, '<br>');
    htm = htm.replace(/<a[^>]*>([^<]+)<\/a>/g, '');
    htm = htm.replace(/&(nbsp|amp|quot|lt|gt);/g, "");
    return htm;
}
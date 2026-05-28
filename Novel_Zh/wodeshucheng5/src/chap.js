load("config.js");

function execute(url) {
    var html = "";
    var current = url;
    var seen = {};

    for (var i = 0; i < 20; i++) {
        if (seen[current]) break;
        seen[current] = true;
        var response = fetchDoc(current);
        if (!response.ok) break;
        var doc = response.html();
        var content = doc.select("#content").first();
        content.select("script, style").remove();
        html += content.html();

        var next = doc.select(".section-opt a:contains(下一页)").first().attr("href");
        if (!next || next.indexOf("_") === -1) break;
        current = absUrl(next);
    }

    html = cleanChapter(html);
    if (!html) return null;
    return Response.success(html);
}

function cleanChapter(html) {
    html = (html || "") + "";
    html = html.replace(/请收藏本站[^<]*/g, "");
    html = html.replace(/我的书城网[^<]*更新速度[^<]*/g, "");
    html = html.replace(/\r|\n/g, "");
    html = html.replace(/<p>\s*<\/p>/g, "");
    html = html.replace(/\s+/g, " ");
    return html.trim();
}

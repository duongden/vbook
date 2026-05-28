load("config.js");

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    var chapters = [];

    if (
        url.indexOf("/api/container/getIndex") >= 0 &&
        url.indexOf("title=%E7%BC%96%E8%BE%91%E8%AE%B0%E5%BD%95") >= 0
    ) {
        chapters.push({
            name: "编辑记录",
            url: url,
            host: BASE_URL
        });
        return Response.success(chapters);
    }

    var mblog = wbFetchMblog(url);

    if (!mblog) {
        chapters.push({
            name: "正文",
            url: url,
            host: BASE_URL
        });
        return Response.success(chapters);
    }

    var plain = wbStripTags(mblog.text || "").replace(/#.*?#/g, "");
    var first = plain.substring(0, 10);
    if (plain.length > 10) first += "......";

    chapters.push({
        name: first || "正文",
        url: BASE_URL + "/detail/" + (mblog.id || mblog.mid),
        host: BASE_URL
    });

    if (
        mblog.page_info &&
        mblog.page_info.type === "article" &&
        mblog.page_info.page_url
    ) {
        var title =
            mblog.page_info.content1 ||
            mblog.page_info.page_title ||
            "网页链接";

        chapters.push({
            name: title,
            url: mblog.page_info.page_url,
            host: BASE_URL
        });
    }

    var text = String(mblog.text || "");
    var linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    var match;

    while ((match = linkRegex.exec(text)) !== null) {
        var href = match[1];
        // Chỉ thêm các link là detail bài viết, bỏ qua link search, p, v.v...
        if (href.indexOf("/detail/") >= 0 || href.indexOf("/article/") >= 0) {
            var label = wbStripTags(match[2]);
            if (!label || label === "网页链接") label = "网页链接";
            chapters.push({
                name: label,
                url: href,
                host: BASE_URL
            });
        }
    }

    var editCount = parseInt(mblog.edit_count || "0", 10);
    if (editCount > 0) {
        chapters.push({
            name: "编辑记录",
            url: BASE_URL + "/api/container/getIndex?title=%E7%BC%96%E8%BE%91%E8%AE%B0%E5%BD%95&containerid=231440_-_" + (mblog.id || mblog.mid),
            host: BASE_URL
        });
    }

    return Response.success(chapters);
}
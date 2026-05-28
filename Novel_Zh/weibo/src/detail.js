load("config.js");

function execute(url) {
    url = wbAbs(url);
    var mblog = wbFetchMblog(url);
    var name = "";
    var author = "";
    var intro = "";
    var cover = "";
    var comments = [];

    if (mblog) {
        var item = wbMapMblog(mblog);
        name = item.name;
        author = item.author;
        intro = wbMblogHtml(mblog) || item.description;
        cover = item.cover;
        if (mblog.id || mblog.mid) {
            comments.push({
                title: "评论",
                input: BASE_URL + "/comments/hotflow?id=" + (mblog.id || mblog.mid) + "&mid=" + (mblog.mid || mblog.id) + "&max_id=0&max_id_type=0",
                script: "comment.js"
            });
        }
    } else {
        var res = wbFetch(url, { method: "GET" });
        var html = res && res.ok ? res.text() + "" : "";
        name = wbStripTags((html.match(/"text"\s*:\s*"([^"]+)"/) || ["", "微博"])[1]).substring(0, 30) + "......";
        author = (html.match(/"screen_name"\s*:\s*"([^"]+)"/) || ["", ""])[1];
        intro = wbCleanHtml((html.match(/"text"\s*:\s*"([^"]+)"/) || ["", ""])[1]);
        cover = WEIBO_NO_COVER;
    }

    return Response.success({
        name: name || "微博",
        cover: cover || WEIBO_NO_COVER,
        host: BASE_URL,
        author: author,
        description: intro,
        ongoing: false,
        comments: comments.length ? comments : undefined
    });
}

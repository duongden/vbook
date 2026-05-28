load("config.js");

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    if (url.indexOf("title=%E7%BC%96%E8%BE%91%E8%AE%B0%E5%BD%95") >= 0) {
        var json = wbFetchJson(url);
        if (!json || !json.data || !json.data.cards) {
            return Response.success("");
        }

        var cards = json.data.cards;
        var html = "";

        for (var i = 0; i < cards.length; i++) {
            var group = cards[i].card_group;
            if (!group || !group.length || !group[0].mblog) continue;

            var editMblog = group[0].mblog;
            html += "-⬇️ 编辑于" + wbTrim(editMblog.created_at) + " ⬇️ -<br>";
            html += wbMblogHtml(editMblog) + "<br>&lrm;<br>";
        }
        return Response.success(html);
    }

    if (url.indexOf("ttarticle") >= 0 || url.indexOf("card.weibo.com/article") >= 0) {
        var articleRes = wbFetch(url, {
            method: "GET",
            headers: { "Accept": "text/html,*/*" }
        });

        if (!articleRes || !articleRes.ok) {
            return Response.error("Cannot load: " + (articleRes ? articleRes.status : ""));
        }

        var doc = articleRes.html();
        doc.select("script, style, iframe, .ads").remove();

        var art = doc.select(".f-art, article, .article").first();
        if (art) {
            return Response.success(art.html() + "");
        }
        return Response.success(doc.select("body").html() + "");
    }

    var mblog = wbFetchMblog(url);

    if (!mblog) {
        var fbRes = wbFetch(url, {
            method: "GET",
            headers: { "Accept": "text/html,*/*" }
        });

        if (!fbRes || !fbRes.ok) {
            return Response.error("Cannot load: " + (fbRes ? fbRes.status : ""));
        }

        var fbDoc = fbRes.html();
        fbDoc.select("script, style, iframe, .ads").remove();
        return Response.success(fbDoc.select("body").html() + "");
    }

    var html = "";

    if (mblog.user && mblog.user.screen_name) {
        html += "<p><b>@" + wbTrim(mblog.user.screen_name) + "</b></p>";
    }

    if (mblog.created_at) {
        html += "<p>" + wbTrim(mblog.created_at) + "</p>";
    }

    html += wbMblogHtml(mblog);

    return Response.success(html);
}
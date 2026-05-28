var BASE_URL = "https://m.weibo.cn";
var WEIBO_UA = "Mozilla/5.0 (Linux; Android 13; VBook) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36";
var WEIBO_NO_COVER = "https://raw.githubusercontent.com/duongden/vbook/main/nocover.png";

function wbTrim(value) {
    if (value === null || typeof value === "undefined") return "";
    return String(value).replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function wbHeaders(extra) {
    var headers = {
        "Accept": "application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent": WEIBO_UA,
        "Referer": BASE_URL + "/"
    };
    if (extra) {
        for (var key in extra) {
            if (extra.hasOwnProperty(key)) headers[key] = String(extra[key]);
        }
    }
    return headers;
}

function wbFetch(url, options) {
    options = options || {};
    options.headers = wbHeaders(options.headers || null);
    if (!options.timeout) options.timeout = 15000;
    return fetch(url, options);
}

function wbAbs(url) {
    url = wbTrim(url);
    if (!url) return "";
    if (url.indexOf("//") === 0) return "https:" + url;
    if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) return url;
    if (url.charAt(0) === "/") return BASE_URL + url;
    return BASE_URL + "/" + url;
}

function wbBuildUrl(base, params) {
    var pairs = [];
    for (var key in params) {
        if (!params.hasOwnProperty(key)) continue;
        var value = params[key];
        if (value === null || typeof value === "undefined") continue;
        pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(String(value)));
    }
    if (pairs.length === 0) return base;
    return base + (base.indexOf("?") >= 0 ? "&" : "?") + pairs.join("&");
}

function wbStripTags(html) {
    html = html === null || typeof html === "undefined" ? "" : String(html);
    return html.replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, "\"")
        .replace(/\s+\n/g, "\n")
        .replace(/\n\s+/g, "\n")
        .trim();
}

function wbCleanHtml(html) {
    html = html === null || typeof html === "undefined" ? "" : String(html);
    return html.replace(/<a[^>]*href=["'][^"']*["'][^>]*>/gi, "")
        .replace(/<\/a>/gi, "")
        .replace(/<span[^>]*>/gi, "")
        .replace(/<\/span>/gi, "")
        .replace(/<br\s*\/?>/gi, "<br>");
}

function wbImageUrl(pic) {
    if (!pic) return "";
    if (typeof pic === "string") return wbAbs(pic);
    if (pic.large && pic.large.url) return wbAbs(pic.large.url);
    if (pic.url) return wbAbs(pic.url);
    if (pic.pic_big) return wbAbs(pic.pic_big);
    return "";
}

function wbMblogIdFromUrl(url) {
    var text = String(url || "");
    var match = text.match(/\/detail\/(\d+)/);
    if (match) return match[1];
    match = text.match(/[?&](?:id|mid)=([0-9]+)/);
    if (match) return match[1];
    match = text.match(/\/status\/([0-9A-Za-z]+)/);
    if (match) return match[1];
    match = text.match(/(\d{10,})/);
    return match ? match[1] : "";
}

function wbFetchJson(url) {
    var res = wbFetch(url, { method: "GET" });
    if (!res || !res.ok) return null;
    try {
        return res.json();
    } catch (e) {
        return null;
    }
}

function wbFetchMblog(input) {
    var id = wbMblogIdFromUrl(input);
    if (!id) return null;
    var detailUrl = BASE_URL + "/detail/" + id;
    var json = wbFetchJson(BASE_URL + "/statuses/show?id=" + encodeURIComponent(id));
    if (json && json.ok && json.data) return json.data;
    if (json && json.id) return json;
    json = wbFetchJson(BASE_URL + "/api/statuses/show?id=" + encodeURIComponent(id));
    if (json && json.ok && json.data) return json.data;
    if (json && json.id) return json;
    var res = wbFetch(detailUrl, { method: "GET" });
    var text = "";
    if (res && res.ok) text = res.text() + "";
    var mblog = wbMblogFromHtml(text, id);
    if (mblog) return mblog;
    text = wbBrowserHtml(detailUrl);
    return wbMblogFromHtml(text, id);
}

function wbBrowserHtml(url) {
    if (typeof Engine === "undefined" || !Engine.newBrowser) return "";
    var b = Engine.newBrowser();
    try {
        b.setUserAgent(WEIBO_UA);
        b.block([".*\\.woff", ".*\\.woff2", ".*\\.ttf", ".*\\.mp4"]);
        b.launch(url, 15000);
        return b.html(15000).html() + "";
    } catch (e) {
        try {
            return b.html().html() + "";
        } catch (e2) {
            return "";
        }
    } finally {
        try {
            b.close();
        } catch (e3) {
        }
    }
}

function wbJsonString(value) {
    value = value === null || typeof value === "undefined" ? "" : String(value);
    try {
        return JSON.parse("\"" + value + "\"");
    } catch (e) {
        return value;
    }
}

function wbMblogFromHtml(text, id) {
    text = text === null || typeof text === "undefined" ? "" : String(text);
    if (!text || text.indexOf("Sina Visitor System") >= 0) return null;
    var match = text.match(/"mblog"\s*:\s*(\{[\s\S]+?\})\s*,\s*"scheme"/);
    if (match) {
        try {
            return JSON.parse(match[1]);
        } catch (e) {
        }
    }
    var body = "";
    match = text.match(/"text"\s*:\s*"([\s\S]*?)"\s*,/);
    if (match) body = wbJsonString(match[1]);
    if (!body) return null;
    var user = {};
    match = text.match(/"screen_name"\s*:\s*"([^"]+)"/);
    if (match) user.screen_name = wbJsonString(match[1]);
    match = text.match(/"profile_image_url"\s*:\s*"([^"]+)"/);
    if (match) user.profile_image_url = wbJsonString(match[1]);
    var pics = [];
    var picMatches = text.match(/"size":\s*"[^"]+",\s*"url":\s*"[^"]+"/g);
    if (picMatches) {
        for (var i = 0; i < picMatches.length; i++) {
            var p = picMatches[i].match(/"url":\s*"([^"]+)"/);
            if (p) pics.push({ large: { url: wbJsonString(p[1]) } });
        }
    }
    return {
        id: id,
        mid: id,
        text: body,
        user: user,
        pics: pics
    };
}

function wbCardMblog(card) {
    if (!card) return null;
    if (card.mblog) return card.mblog;
    if (card.card_group && card.card_group.length) {
        for (var i = 0; i < card.card_group.length; i++) {
            if (card.card_group[i] && card.card_group[i].mblog) return card.card_group[i].mblog;
        }
    }
    return null;
}

function wbMapMblog(mblog) {
    var text = wbStripTags(mblog && mblog.text ? mblog.text : "");
    var title = text.substring(0, 30);
    if (text.length > 30) title += "......";
    var cover = "";
    if (mblog && mblog.page_info && mblog.page_info.page_pic) cover = wbImageUrl(mblog.page_info.page_pic);
    if (!cover && mblog && mblog.pics && mblog.pics.length) cover = wbImageUrl(mblog.pics[0]);
    if (!cover && mblog && mblog.thumbnail_pic) cover = wbImageUrl(mblog.thumbnail_pic);
    if (!cover && mblog && mblog.user && mblog.user.profile_image_url) cover = wbImageUrl(mblog.user.profile_image_url);
    return {
        name: title || "微博",
        link: BASE_URL + "/detail/" + (mblog.id || mblog.mid),
        cover: cover || WEIBO_NO_COVER,
        description: text,
        host: BASE_URL,
        author: mblog && mblog.user ? wbTrim(mblog.user.screen_name) : "",
        tag: mblog && mblog.created_at ? wbTrim(mblog.created_at) : ""
    };
}

function wbMapCard(card) {
    var mblog = wbCardMblog(card);
    if (mblog) return wbMapMblog(mblog);
    var title = wbTrim(card && (card.title_sub || card.desc || card.desc1 || card.card_type_name));
    var scheme = wbAbs(card && card.scheme ? card.scheme : "");
    var cover = "";
    if (card && card.pic) cover = wbImageUrl(card.pic);
    if (card && card.user && card.user.profile_image_url) cover = wbImageUrl(card.user.profile_image_url);
    if (!title && card && card.user && card.user.screen_name) title = wbTrim(card.user.screen_name);
    if (!scheme && card && card.user && card.user.id) scheme = BASE_URL + "/u/" + card.user.id;
    if (!title || !scheme) return null;
    return {
        name: title,
        link: scheme,
        cover: cover || WEIBO_NO_COVER,
        description: wbTrim((card && (card.desc1 || card.description || card.desc2)) || ""),
        host: BASE_URL,
        tag: wbTrim(card && card.desc2 ? card.desc2 : "")
    };
}

function wbCollectCards(cards, out) {
    if (!cards) return;
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var item = wbMapCard(card);
        if (item && item.name && item.link) out.push(item);
        if (card && card.card_group) wbCollectCards(card.card_group, out);
    }
}

function wbContainerUrl(containerid, page) {
    return wbBuildUrl(BASE_URL + "/api/container/getIndex", {
        containerid: containerid,
        page_type: "searchall",
        page: String(page || 1)
    });
}

function wbTopicInput(title) {
    if (title === "热门" || title === "关注") {
        return BASE_URL + "/api/container/getIndex?containerid=102803&openApp=0&page={{page}}";
    }
    return BASE_URL + "/api/container/getIndex?containerid=100103type%3D1%26q%3D" + encodeURIComponent(title) + "%26t%3D&page_type=searchall&page={{page}}";
}

function wbNavTabs(includeSub) {
    var main = ["关注", "热门", "榜单", "同城", "社会", "科技", "明星", "电影", "音乐", "情感", "时尚", "美妆"];
    var sub = ["好友圈", "悄悄关注", "我赞过", "我的收藏", "特别关注", "名人明星", "同事", "同学", "模特", "摄影"];
    var titles = main.slice();
    if (includeSub) {
        for (var i = 0; i < sub.length; i++) titles.push(sub[i]);
    }
    var data = [];
    for (var j = 0; j < titles.length; j++) {
        data.push({
            title: titles[j],
            input: wbTopicInput(titles[j]),
            script: "gen.js"
        });
    }
    return data;
}

function wbMblogHtml(mblog) {
    if (!mblog) return "";
    var html = wbCleanHtml(mblog.text || "");
    if (html) html += "<br>";
    if (mblog.pics && mblog.pics.length) {
        for (var i = 0; i < mblog.pics.length; i++) {
            var url = wbImageUrl(mblog.pics[i]);
            if (url) html += '<img src="' + url + '"><br>';
        }
    }
    if (mblog.page_info && mblog.page_info.type === "article" && mblog.page_info.page_pic) {
        var pic = wbImageUrl(mblog.page_info.page_pic);
        if (pic) html += '<img src="' + pic + '"><br>';
    }
    return html;
}

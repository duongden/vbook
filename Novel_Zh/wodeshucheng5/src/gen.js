load("config.js");

function execute(input, page) {
    if (!page) page = "1";
    var url = buildListUrl(input, page);
    var response = fetchDoc(url);
    if (!response.ok) return null;

    var doc = response.html();
    var data = [];
    parseCards(doc, data);
    parseRows(doc, data);
    parseLinks(doc, data);

    var next = hasNext(doc) ? (parseInt(page, 10) + 1) + "" : null;
    return Response.success(uniqueBooks(data), next);
}

function buildListUrl(input, page) {
    input = (input || "/") + "";
    if (input.indexOf("http") !== 0) input = absUrl(input);
    if (page === "1") return input;
    return input.replace(/\/\d+\/?$/, "/" + page + "/");
}

function parseCards(doc, data) {
    doc.select(".item").forEach(function (item) {
        var a = item.select("dt a[href*=book_], .image a[href*=book_]").first();
        var author = cleanText(item.select("dt span").text());
        var cover = item.select("img").attr("src");
        var desc = cleanText(item.select("dd").text());
        pushBook(data, a, cleanText(a.text()) || cleanText(item.select("img").attr("alt")), author || desc, cover);
    });
}

function parseRows(doc, data) {
    doc.select(".txt-list li").forEach(function (li) {
        var a = li.select(".s2 a[href*=book_], a[href*=book_]").first();
        var category = cleanText(li.select(".s1").text());
        var author = cleanText(li.select(".s4").text()) || cleanText(li.select(".s5").text());
        pushBook(data, a, cleanText(a.text()), cleanText(category + " " + author), "");
    });
}

function parseLinks(doc, data) {
    doc.select(".tp-box li a[href*=book_], .cmd-bd a[href*=book_]").forEach(function (a) {
        pushBook(data, a, cleanText(a.attr("title")) || cleanText(a.text()), "", "");
    });
}

function pushBook(data, a, name, description, cover) {
    if (!a || !name) return;
    var href = a.attr("href");
    if (!href || href.indexOf("book_") === -1 || href.indexOf(".html") > -1) return;
    data.push({
        name: name,
        link: absUrl(href),
        cover: absUrl(cover),
        description: description || "",
        host: BASE_URL
    });
}

function uniqueBooks(items) {
    var data = [];
    var seen = {};
    for (var i = 0; i < items.length; i++) {
        var link = items[i].link;
        if (!link || seen[link]) continue;
        seen[link] = true;
        data.push(items[i]);
    }
    return data;
}

function hasNext(doc) {
    return cleanText(doc.select(".pagination a:contains(>>), .index-container a:contains(下一页)").text()).length > 0;
}


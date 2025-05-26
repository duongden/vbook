load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let data  ="";
    let part1 = url.replace(BASE_URL, "").replace(".html","")
    var next = part1;
    while (next.includes(part1)) {
        console.log(next)
        let response = fetch(BASE_URL + next + ".html");
        console.log(BASE_URL + next + ".html")
        if (response.ok) {
            let doc = response.html();
            next = doc.select("a:contains(下一页)").first().attr("href").replace(".html","");
            let htm = doc.select(".con p").html();
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

// ✅ Hàm làm sạch HTML
function cleanHtml(data) {
    if (!data) return "";
    data = data.replace(/&nbsp;/g, "");
    data = data.replace(/&(amp|quot|lt|gt);/g, "");
    data = data.replace(/<!--(<br\s*\/?>)?[^>]*-->/gm, '');
    data = data.replace(/<a[^>]*>([^<]+)<\/a>/g, '');
    data = data.replace(/(<br\s*\/?>|\n)+/g, "<br><br>"); // gộp xử lý <br> và xuống dòng
    data = data.replace(/ap;ap;ldquo;ap;ap;hellip;ap;ap;hellip;ap;ap;rdquo;/g, "");
    return data;
}

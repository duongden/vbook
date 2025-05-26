function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select(".con p").html();
        return Response.success(cleanHtml(htm));
    }
    return null;
}

// ✅ Hàm làm sạch HTML
function cleanHtml(htm) {
    if (!htm) return "";
    htm = htm.replace(/&nbsp;/g, "");
    htm = htm.replace(/&(amp|quot|lt|gt);/g, "");
    htm = htm.replace(/<!--(<br\s*\/?>)?[^>]*-->/gm, '');
    htm = htm.replace(/<a[^>]*>([^<]+)<\/a>/g, '');
    htm = htm.replace(/(<br\s*\/?>|\n)+/g, "<br><br>"); // gộp xử lý <br> và xuống dòng
    htm = htm.replace(/ap;ap;ldquo;ap;ap;hellip;ap;ap;hellip;ap;ap;rdquo;/g, "");
    return htm;
}

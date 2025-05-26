load('config.js');
function execute(url) {
    // Chuẩn hóa URL: thay thế domain bằng BASE_URL
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let data = "";
    // Loại bỏ BASE_URL và phần mở rộng ".html" để lấy chuỗi cơ sở của URL
    let part1 = url.replace(BASE_URL, "").replace(".html", "");
    var next = part1;
    // Vòng lặp để fetch các trang theo liên kết "下一页"
    while (next.includes(part1)) {
        console.log(next);
        let response = fetch(BASE_URL + next + ".html");
        if (response.ok) {
            let doc = response.html();
            // Lấy liên kết "下一页" và loại bỏ phần mở rộng ".html"
            next = doc.select("a:contains(下一页)").first().attr("href").replace(".html", "");
            // Loại bỏ các phần tử lỗi hoặc không mong muốn
            doc.select(".posterror").remove();
            doc.select("script").remove();
            // Lấy nội dung của #booktxt và làm sạch nội dung đó
            let htm = doc.select("#booktxt").html();
            data += cleanHtml(htm);
        } else {
            break;
        }
    }
    if (data) {
        // Loại bỏ các thẻ <p></p> rỗng nếu có
        data = data.replace(/<p><\/p>/g, '');
        return Response.success(data);
    }
    return null;
}
// Hàm làm sạch HTML: sử dụng biến content (đầu vào) đúng cách
function cleanHtml(data) {
    if (!data) return "";
    data = data.replace(/(<br>\s*){2,}/g, '<br>');
    data = data.replace(/<a[^>]*>([^<]+)<\/a>/g, '');
    data = data.replace(/&(nbsp|amp|quot|lt|gt);/g, "");
    data = data.replace(/<!--(<br \/>)?[^>]*-->/gm, '');
    data = data.replace(/\&nbsp;/g, "");
    data = data.replace("ap;ap;ldquo;ap;ap;hellip;ap;ap;hellip;ap;ap;rdquo;", "");
    return data;
}

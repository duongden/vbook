load('config.js');
function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    let response = fetch(BASE_URL + url);
    console.log(BASE_URL + url)
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select(".l li").forEach(e => {
            // Lấy phần href của truyện
            var a = e.select(".s2 a").first();
            var href = a.attr("href"); // ví dụ: /book/185017/ hoặc /book/185139.htm
            // Dùng regex để trích xuất id (chỉ số nằm trong nhóm bắt đầu đầu tiên)
            var m = href.match(/(\d+)/);
            var cover = "";
            if(m && m[1]){
                var id = m[1];
                // Tính folder: sử dụng Math.floor(Number(id)/1000)
                cover = BASE_URL + "/images/" + Math.floor(Number(id) / 1000) + "/" + id + "/" + id + "s.jpg";
            }
            data.push({
                name: a.text(),
                link: BASE_URL + href,
                cover: cover,
                description: e.select(".s3").first().text(),
                host: BASE_URL
            })
        });
        return Response.success(data)
    }
    return null;
}

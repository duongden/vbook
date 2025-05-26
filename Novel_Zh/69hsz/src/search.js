load('config.js');
function execute(key) {
    // Xây dựng URL tìm kiếm bằng thuộc tính queries (nếu được hỗ trợ)
    let response = fetch(BASE_URL + '/ss/', {
        method: "GET",
        queries: {
            searchkey: key,
        },
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "referer": BASE_URL + "/class/10_1.html"
        }
    });

    if (response.ok) {
        let doc = response.html();
        const data = [];
        // Sử dụng selector theo id "#hotcontent" (chứ không phải class ".hotcontent")
        doc.select("#hotcontent .item").forEach(e => {
            data.push({
                name: e.select("dt a").first().text().trim(),
                cover: e.select(".image img").attr("data-original"),
                link: BASE_URL + e.select("dt a").first().attr("href"),
                // Nếu ý bạn muốn lấy tên tác giả, dùng phần tử bên trong .btm a
                description: e.select(".btm a").first().text().trim(),
                host: BASE_URL
            });
        });
        return Response.success(data);
    }
    return null;
}

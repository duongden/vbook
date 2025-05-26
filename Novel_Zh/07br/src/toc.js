load('config.js'); 
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".listmain").last();

        // Bỏ các phần không phải chương
        el1.select("dd.more").remove();         // nút "展开全部章节"

        let el = el1.select("dd a"); // Sau khi xóa rồi mới select
        const data = [];
        for (let i = 0; i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.text(),
                url: BASE_URL + e.attr("href"),
                host: BASE_URL
            });
        }
        return Response.success(data);
    }
    return null;
}

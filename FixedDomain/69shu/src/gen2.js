load('libs.js');
load('config.js');

function execute(url, page) {
    if (!page) page = '1';

    // Xây dựng URL: nếu page là 1 thì dùng URL gốc, ngược lại thêm số trang vào URL
    let fullUrl = page === '1'
        ? BASE_URL + "/tag" + url
        : BASE_URL + "/tag" + url + page + "/";
    console.log(fullUrl);

    let response = fetch(fullUrl);
    if (!response.ok) return Response.success([]);

    let doc = response.html('gbk');
    const data = [];

    // Lấy danh sách bài viết từ <ul id="article_list_content">
    doc.select("ul#article_list_content li").forEach(e => {
        let link = e.select("h3 a").attr("href");
        let name = e.select("h3").text().trim();
        let description = e.select(".zxzj > p").text().replace("最近章节", "");
        let m = link.match(/\/(?:book|b)\/(\d+)\.htm/);
        let id = m ? m[1] : "";
        let cover = id
            ? `${CDN_URL}/files/article/image/${Math.floor(id / 1000)}/${id}/${id}s.jpg`
            : "";

        data.push({
            name: name,
            link: link,
            cover: cover,
            description: description,
            host: BASE_URL
        });
    });

    // Sử dụng adjacent sibling selector để lấy phần tử <a> ngay sau <strong>
    let nextPage = doc.select("div.pagelink strong + a").text().trim();
    if(nextPage === "") nextPage = null;

    return Response.success(data, nextPage);
}

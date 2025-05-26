load('config.js');

function execute(key, page) {
    if (!page) page = '1';

    var keyword = encodeURIComponent(key);
    var url = BASE_URL + "/tim-kiem?q=" + keyword + "&page=" + page;

    var response = fetch(url, {
        method: 'GET',
        headers: {
            "referer": BASE_URL + "/tim-kiem"
        }
    });

    if (!response.ok) return null;

    var doc = response.html();

    // ✅ Tìm totalPage bằng cách quét tất cả href chứa page=
    var totalPage = 1;
    var pageLinks = doc.select('.pagination a');
    for (var i = 0; i < pageLinks.size(); i++) {
        var href = pageLinks.get(i).attr("href");
        if (href) {
            var match = href.match(/page=(\d+)/);
            if (match && match[1]) {
                var num = parseInt(match[1]);
                if (!isNaN(num) && num > totalPage) {
                    totalPage = num;
                }
            }
        }
    }

    // ✅ Tính trang kế tiếp nếu còn
    var currentPage = parseInt(page);
    var next = null;
    if (!isNaN(currentPage) && currentPage < totalPage) {
        next = String(currentPage + 1);
    }

    // ✅ Lấy danh sách truyện
    var data = [];
    var items = doc.select(".story-list div.media.m-b-30");
    for (var i = 0; i < items.size(); i++) {
        var e = items.get(i);
        data.push({
            name: e.select(".media-heading a").first().text(),
            link: e.select(".media-heading a").first().attr("href"),
            cover: BASE_URL + e.select(".story-thumb img.media-object").attr("src"),
            description: e.select("div.media-body > p:nth-child(3) > a").text(),
            host: BASE_URL
        });
    }

    return Response.success(data, next);
}

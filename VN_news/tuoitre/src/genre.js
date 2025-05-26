load('config.js')

function execute() {
    return Response.success([
        { title: "Thời sự", input: "/timeline/3/", script: "zen2.js" },
        { title: "Phóng sự", input: "/timeline/89/", script: "zen2.js" },
        { title: "Xã hội", input: "/timeline/200003/", script: "zen2.js" },
        { title: "Bình luận", input: "/timeline/87/", script: "zen2.js" },
        { title: "Thế giới", input: "/timeline/2/", script: "zen2.js" },
        { title: "Hồ sơ", input: "/timeline/20/", script: "zen2.js" },
        { title: "Pháp luật", input: "/timeline/6/", script: "zen2.js" },
        { title: "Kinh doanh", input: "/timeline/11/", script: "zen2.js" },
        { title: "Công nghệ", input: "/timeline/200029/", script: "zen2.js" },
        { title: "Xe", input: "/timeline/659/", script: "zen2.js" },
        { title: "Du lịch", input: "/timeline/100/", script: "zen2.js" },
        { title: "Nhịp sống trẻ", input: "/timeline/7/", script: "zen2.js" },
        { title: "Văn hóa", input: "/timeline/200017/", script: "zen2.js" },
        { title: "Giải trí", input: "/timeline/10/", script: "zen2.js" },
        { title: "Thể thao", input: "/timeline/1209/", script: "zen2.js" },
        { title: "Giáo dục", input: "/timeline/13/", script: "zen2.js" },
        { title: "Nhà đất", input: "/timeline/204/", script: "zen2.js" },
        { title: "Sức khỏe", input: "/timeline/12/", script: "zen2.js" },
        { title: "Giả thật", input: "/timeline/200015/", script: "zen2.js" }
    ]);
}
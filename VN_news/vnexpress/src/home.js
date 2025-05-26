function execute() {
    return Response.success([
        { title: "Thời sự", input: "/thoi-su", script: "gen.js" },
        { title: "Thế giới", input: "/the-gioi", script: "gen.js" },
        { title: "Kinh doanh", input: "/kinh-doanh", script: "gen.js" },
        { title: "Bất động sản", input: "/bat-dong-san", script: "gen.js" },
        { title: "Khoa học", input: "/khoa-hoc", script: "gen.js" },
        { title: "Giải trí", input: "/giai-tri", script: "gen.js" },
        { title: "Thể thao", input: "/the-thao", script: "gen.js" },
        { title: "Pháp luật", input: "/phap-luat", script: "gen.js" },
        { title: "Giáo dục", input: "/giao-duc", script: "gen.js" },
        { title: "Sức khỏe", input: "/suc-khoe", script: "gen.js" },
        { title: "Đời sống", input: "/doi-song", script: "gen.js" },
        { title: "Xe", input: "/oto-xe-may", script: "gen.js" },
        { title: "Ý kiến", input: "/y-kien", script: "gen.js" },
        // Add more items as needed
    ]);
}

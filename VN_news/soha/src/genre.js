load('config.js')

function execute() {
    return Response.success([
        { title: "Thời sự - Xã hội", input: "/thoi-su-xa-hoi.htm", script: "zen.js" },
        { title: "Đời sống", input: "/thoi-su-xa-hoi/doi-song.htm", script: "zen.js" },
        { title: "Đô thị", input: "/thoi-su-xa-hoi/do-thi.htm", script: "zen.js" },
        { title: "Giáo dục", input: "/thoi-su-xa-hoi/giao-duc.htm", script: "zen.js" },
        { title: "Y tế", input: "/thoi-su-xa-hoi/y-te.htm", script: "zen.js" },
        { title: "Phóng sự - Ký sự", input: "/thoi-su-xa-hoi/phong-su-ky-su.htm", script: "zen.js" },
        { title: "Kinh doanh", input: "/kinh-doanh.htm", script: "zen.js" },
        { title: "Quốc tế", input: "/quoc-te.htm", script: "zen.js" },
        { title: "Thời sự thế giới", input: "/quoc-te/thoi-su-the-gioi.htm", script: "zen.js" },
        { title: "Quan điểm", input: "/quoc-te/quan-diem.htm", script: "zen.js" },
        { title: "Tư liệu", input: "/quoc-te/tu-lieu.htm", script: "zen.js" },
        { title: "Chuyện đó đây", input: "/quoc-te/chuyen-do-day.htm", script: "zen.js" },
        { title: "Thể thao", input: "/the-thao.htm", script: "zen.js" },
        { title: "Giải trí", input: "/giai-tri.htm", script: "zen.js" },
        { title: "Nhân vật", input: "/giai-tri/nhan-vat.htm", script: "zen.js" },
        { title: "Hậu trường", input: "/giai-tri/hau-truong.htm", script: "zen.js" },
        { title: "Truyền hình", input: "/giai-tri/truyen-hinh.htm", script: "zen.js" },
        { title: "Phim ảnh", input: "/giai-tri/phim-anh.htm", script: "zen.js" },
        { title: "Pháp luật", input: "/phap-luat.htm", script: "zen.js" },
        { title: "Xét xử", input: "/phap-luat/xet-xu.htm", script: "zen.js" },
        { title: "Kỳ án", input: "/phap-luat/ky-an.htm", script: "zen.js" },
        { title: "Xe", input: "/xe.htm", script: "zen.js" },
        { title: "Đời sống", input: "/doi-song.htm", script: "zen.js" },
        { title: "Công nghệ", input: "/cong-nghe.htm", script: "zen.js" },
        { title: "Tri thức mới", input: "/tri-thuc-moi.htm", script: "zen.js" },
    ]);
}

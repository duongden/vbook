function execute() {
    return Response.success([
        { title: "Mới đăng", input: "/latest", script: "gen.js" },
        { title: "Cập nhật", input: "/updates", script: "gen.js" },       
        { title: "Xu hướng", input: "/trending", script: "gen.js" },
        { title: "Xem nhiều", input: "/popular", script: "gen.js" },
        { title: "A-Z", input: "/alphabet", script: "gen.js" }, 
        { title: "Kỳ ảo", input: "/ky-ao", script: "gen.js" },
        { title: "Chư thiên vô hạn", input: "/chu-thien-vo-han", script: "gen.js" },
        { title: "Trò chơi", input: "/tro-choi", script: "gen.js" },
        { title: "Huyền nghi", input: "/huyen-nghi", script: "gen.js" },
    ])
}

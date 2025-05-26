function execute() {
    return Response.success([
        { title: "人气热", input: "/bangdan/36014", script: "gen.js" },
        { title: "点击榜", input: "/bangdan/36015", script: "gen.js" },
        { title: "收藏榜", input: "/bangdan/36016", script: "gen.js" },
        { title: "新书潜力", input: "/bangdan/36017", script: "gen.js" },
        { title: "完本榜", input: "/bangdan/36021", script: "gen.js" }
    ]);
}
function execute() {
    return Response.success([
        {title: "最新更新", input: "/zuixin/", script: "gen.js"},
        {title: "完本排行榜", input: "/wanjie/", script: "gen.js"},
        {title: "小说排行榜", input: "/paihang/", script: "gen.js"}
    ]);
}

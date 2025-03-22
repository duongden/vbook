function execute() {
    return Response.success([
        {title: "新书榜", input: "/novels/newhot_0_0_1.htm", script: "gen.js"},
        {title: "最新更新", input: "/last", script: "update.js"},
        {title: "全部分类", input: "/novels/full", script: "gen.js"},
    ]);
}
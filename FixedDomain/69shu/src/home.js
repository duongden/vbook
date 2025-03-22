function execute() {
    return Response.success([
        {title: "新书榜", input: "/ajax_novels/newhot_0_0_{0}.htm", script: "gen.js"},
        {title: "最新更新", input: "/last", script: "update.js"},
        {title: "全部分类", input: "/ajax_novels/full/0/{0}.htm", script: "gen.js"},
    ]);
}
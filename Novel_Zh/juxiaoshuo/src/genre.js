function execute() {
    return Response.success([
        { title: "玄幻", input: "/page/category/xuan_huan", script: "gen.js" },
        { title: "奇幻", input: "/page/category/qi_huan", script: "gen.js" },
        { title: "仙侠", input: "/page/category/xian_xia", script: "gen.js" },
        { title: "武侠", input: "/page/category/wu_xia", script: "gen.js" },
        { title: "历史", input: "/page/category/li_shi", script: "gen.js" },
        { title: "都市", input: "/page/category/du_shi", script: "gen.js" },
        { title: "科幻", input: "/page/category/ke_huan", script: "gen.js" },
        { title: "悬疑", input: "/page/category/xuan_yi", script: "gen.js" },
        { title: "游戏", input: "/page/category/you_xi", script: "gen.js" },
        { title: "全本", input: "/page/category/quan_ben", script: "gen.js" }
    ]);
}

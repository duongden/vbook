function execute() {
    return Response.success([
        //https://www.69shuba.com/novels/newhot_0_0_1.htm
        {title: "新书榜", input: "/novels/newhot_0_0_{0}.htm", script: "gen.js"},
        {title: "人气", input: "/novels/monthvisit_0_0_{0}.htm", script: "gen.js"},
        {title: "推荐", input: "/novels/allvote_0_0_{0}.htm", script: "gen.js"},
        {title: "最新更新", input: "/last", script: "update.js"},
        {title: "男生推荐", input: "/novels/male", script: "gen.js"},
        {title: "女生推荐", input: "/novels/female", script: "gen.js"},
        {title: "全部分类", input: "/novels/full/0/{0}.htm", script: "gen.js"},
    ]);
}
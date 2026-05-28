load("config.js");

function execute() {
    return Response.success([
        { title: "首页推荐", input: "/", script: "gen.js" },
        { title: "玄幻", input: "/fenlei/1/1/", script: "gen.js" },
        { title: "都市", input: "/fenlei/5/1/", script: "gen.js" },
        { title: "仙侠", input: "/fenlei/4/1/", script: "gen.js" },
        { title: "科幻", input: "/fenlei/10/1/", script: "gen.js" },
        { title: "排行榜", input: "/rank/", script: "gen.js" },
        { title: "完本小说", input: "/quanben/fenlei/", script: "gen.js" }
    ]);
}


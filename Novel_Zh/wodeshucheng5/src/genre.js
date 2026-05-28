load("config.js");

function execute() {
    return Response.success([
        { title: "玄幻", input: "/fenlei/1/1/", script: "gen.js" },
        { title: "奇幻", input: "/fenlei/2/1/", script: "gen.js" },
        { title: "武侠", input: "/fenlei/3/1/", script: "gen.js" },
        { title: "仙侠", input: "/fenlei/4/1/", script: "gen.js" },
        { title: "都市", input: "/fenlei/5/1/", script: "gen.js" },
        { title: "军事", input: "/fenlei/6/1/", script: "gen.js" },
        { title: "历史", input: "/fenlei/7/1/", script: "gen.js" },
        { title: "游戏", input: "/fenlei/8/1/", script: "gen.js" },
        { title: "竞技", input: "/fenlei/9/1/", script: "gen.js" },
        { title: "科幻", input: "/fenlei/10/1/", script: "gen.js" },
        { title: "悬疑", input: "/fenlei/11/1/", script: "gen.js" },
        { title: "灵异", input: "/fenlei/12/1/", script: "gen.js" },
        { title: "其他", input: "/fenlei/13/1/", script: "gen.js" },
        { title: "BL", input: "/fenlei/22/1/", script: "gen.js" },
        { title: "GL", input: "/fenlei/23/1/", script: "gen.js" }
    ]);
}


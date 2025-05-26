function execute() {
    return Response.success([
        {title: "玄幻", input: "/sort/1/", script: "zen.js"},
        {title: "武侠", input: "/sort/2/", script: "zen.js"},
        {title: "都市", input: "/sort/3/", script: "zen.js"},
        {title: "历史", input: "/sort/4/", script: "zen.js"},
        {title: "科幻", input: "/sort/5/", script: "zen.js"},
        {title: "游戏", input: "/sort/6/", script: "zen.js"},
        {title: "女生", input: "/sort/7/", script: "zen.js"},
        {title: "其他", input: "/sort/8/", script: "zen.js"}
    ]);
}
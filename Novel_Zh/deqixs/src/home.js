function execute() {
    return Response.success([
        {title: "最新更新", input: "/", script: "gen.js"},
        {title: "热门小说", input: "/xiaoshuo/2-", script: "zen.js"},
    ]);
}

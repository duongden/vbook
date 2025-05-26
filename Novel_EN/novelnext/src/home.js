load('config.js');
function execute() {
    return Response.success([
        { title: "Latest Release", input: "/sort/update/", script: "gen.js" },
        { title: "Hot Novel", input: "/sort/h/", script: "gen.js" },
        { title: "Completed Novel", input: "/sort/c/", script: "gen.js" },
        { title: "Most Popular", input: "/sort/p/", script: "gen.js" },
    ]);
}

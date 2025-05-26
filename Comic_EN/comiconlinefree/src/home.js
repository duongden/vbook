function execute() {
    return Response.success([
        {title: "Latest Updates", input: "/comic-updates", script: "gen.js"}
    ]);
}
load('config.js')

function execute() {
    return Response.success([
        { title: "Tin mới", input: "/", script: "gen.js" }
    ]);
}

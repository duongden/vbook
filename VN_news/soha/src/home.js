load('config.js')

function execute() {
    return Response.success([
        { title: "Tin chính", input: "/", script: "zen2.js" }
    ]);
}

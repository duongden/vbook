load('config.js')

function execute() {
    return Response.success([
        { title: "Tin mới nhất", input: "/timeline/0/", script: "zen2.js" }
    ]);
}

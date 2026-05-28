load("config.js");

function execute(url) {
    url = wbAbs(url);
    return Response.success([url]);
}

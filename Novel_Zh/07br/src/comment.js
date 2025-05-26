load('config.js');

function execute(input, next) {

    let doc = Html.parse(input);
    let comments = [];
    doc.select("dd").forEach(e => {
        comments.push({
            name: e.select("dd b").text(),
            content: e.select("dd p").text(),
            description: ""
        });
    });
    return Response.success(comments);
}
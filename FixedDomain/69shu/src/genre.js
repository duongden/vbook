load('libs.js');
load('config.js');
function execute() {
    let tag_url = BASE_URL + "/tags";
    console.log(tag_url);
    let response = fetch(tag_url);
    if (!response.ok) {
        return Response.success(["not ok"]);
    }
    let doc = response.html('gbk');
    let _div = doc.select(".tag");
    let _ul = _div.select("a");

    let data = _ul.map(function(a) {return a.text()});
    let result = data.map(item => {
        return {
            title: item,
            input: `/${item}/`,
            script: "gen2.js"
        };
    });

    return Response.success(result);
}

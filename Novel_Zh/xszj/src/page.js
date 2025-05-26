load('config.js');

function execute(url) {
    if (url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url + "/cs/1");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let elr1 = doc.select("#indexselect").first().select("option");
        elr1.forEach(e => {
            data.push(BASE_URL + e.attr("value"));
        });
        return Response.success(data);
    }
    return null;
}

function execute(url) {
    url = url.replace('m.b520.cc', 'www.b520.cc');
    let response = fetch(url);
    console.log("blacktea");
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#content").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}
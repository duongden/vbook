load('config.js');
load('libs.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    var browser = Engine.newBrowser() // Khởi tạo browser
    doc = browser.launch(url, 4000)
    browser.close()
    var htm = doc.select(".txtnav")
    htm.select(".contentadv").remove()
    htm.select(".bottom-ad").remove()
    htm.select(".txtinfo").remove()
    htm.select("#txtright").remove()
    htm.select("h1").remove()
    htm = htm.html()
    htm = cleanHtml(htm)
        .replace(/^第\d+章.*?<br>/, '') // Ex: '  第11745章 大结局，终<br>'
        .replace('(本章完)', '')
        ;
    return Response.success(htm);
}
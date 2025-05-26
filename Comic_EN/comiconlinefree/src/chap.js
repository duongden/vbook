load('config.js');
function execute(url) {
    var doc = Http.get(url).html()
    var imgs= doc.select(".chapter-container img")
    var listImg = []
    imgs.forEach(img=>listImg.push(
        img.attr("data-original").trim()
    ))
    return Response.success(listImg)
}
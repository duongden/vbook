load('config.js');
function execute(url) {

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        doc.select("p").remove();
        doc.select("script").remove();
        let htm = doc.select("#chaptercontent").html();
        htm = cleanHtml(htm);
        return Response.success(htm);
    }
    return null;
}
//clear rác
function cleanHtml(htm) {
    return htm
        .replace(/(<br>\s*){2,}/g, '<br>')
        .replace(/<a[^>]*>([^<]+)<\/a>/g, '')
        .replace(/&(nbsp|amp|quot|lt|gt);/g, "")
        .replace(/<!--(<br \/>)?[^>]*-->/gm, '')
        .replace(/\&nbsp;/g, "")
        .replace(/请收藏本站：https:\/\/www\.29ad\.cc。笔趣阁手机版：https:\/\/m\.29ad\.cc\s*/g, '');
}
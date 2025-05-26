load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    let data = "";
    let part1 = url.replace(BASE_URL, "").replace('.html', '');
    var next = part1;
    while (next.includes(part1)) {

        let response = fetch(BASE_URL + next + ".html");
        if (response.ok) {
            let doc = response.html();
            doc.select("#play").remove();
            doc.select(".report").remove();
            doc.select('p[style*=\"color:red;\"]').remove();
            // doc.select('#play')
            next = doc.select("a:contains(下一页)").first().attr("href").replace('.html', '');
            let htm = doc.select("#booktxt").html();
            data = data + htm;
        } else {
            break;
        }
    }
    if (data) {
        data = data.replace(/<p> 正文完。 <\/p>/g, '')
            .replace(/&(nbsp|amp|quot|lt|gt|bp|emsp);/g, "")
            .replace("新m.. ..大家收藏后就在新打开，老最近已经老打不开，以后老会打不开的，请牢记:,，",'')
            .replace('支持.\\^完*本*神*站*\\^.把本站分享那些需要的小伙伴！找不到书请留言！', '');
        return Response.success(data);
    }
    return null;
}
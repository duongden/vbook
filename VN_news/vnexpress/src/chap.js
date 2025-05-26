function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        doc.select(".lazier").remove();
        doc.select("script").remove();

        //#dark_theme > section.section.page-detail.middle-detail
        doc.select('figure .fig-picture').remove();
        doc.select('.item_slide_show .block_thumb_picture').remove()
        doc.select('.item_slide_show .action_thumb').remove()
        doc.select('ul .list-news').remove()

        let htm = doc.select(".fck_detail").html();
        htm = htm.replace(/<meta itemprop="url" content="/g, '<img src="');
        htm = htm.replace(/<div id="slide_show_/g, '<img id="slide_show_')
        htm = htm.replace(/<\/div>\n <\/div>\n <div class="desc_cation"/g, '</div> <div class="desc_cation"')
        htm = htm.replace(/data-src="/g, 'src="')

        return Response.success(htm);
    }
    return null;
}
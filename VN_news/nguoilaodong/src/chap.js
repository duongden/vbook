function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        doc.select(".lazier").remove();
        doc.select("script").remove();
        doc.select("#lmeaepjr").remove();

        //#dark_theme > section.section.page-detail.middle-detail
        doc.select('.body_start').remove();
        doc.select('div.VCSortableInPreviewMode.link-content-footer.IMSCurrentEditorEditObject').remove();
        doc.select('.VCSortableInPreviewMode.alignRight').remove();
        doc.select('.kbwscwl-relatedbox').remove();
        doc.select('detail__related').remove();

        let htm = doc.select(".detail-content").html();
        htm = htm.replace(/<meta itemprop="url" content="/g, '<img src="');
        htm = htm.replace(/<div id="slide_show_/g, '<img id="slide_show_')
        htm = htm.replace(/<\/div>\n <\/div>\n <div class="desc_cation"/g, '</div> <div class="desc_cation"')
        htm = htm.replace(/data-src="/g, 'src="')
        htm = htm.replace(/<!--(<br \/>)?[^>]*-->/gm, '');
        return Response.success(htm);
    }
    return null;
}
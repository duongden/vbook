load('config.js');
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        doc.select("vmcadszone").remove();
        doc.select('source').remove();
        doc.select('video').remove();
        doc.select('.ck-cms-insert-neww-group').remove();
        doc.select('.summary__content').remove();
        doc.select('.ck-cms-wiki-news-full.vnn-template-noneditable.article-edit').remove();
        doc.select('.insert-wiki-content').remove();

        let htm = doc.select(".maincontent").html();
        return Response.success(cleanHtml(htm));
    }
    return null;
}

function cleanHtml(htm) {
    htm = htm.replace(/\n/g, '<br>');
    htm = htm.replace(/src="data:image\/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="\s+data-original=/g, 'src=');
    return htm.trim();
}
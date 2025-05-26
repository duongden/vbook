load('config.js');
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#content").html();
        htm = cleanHtml(htm);
        return Response.success(htm);
    }
    return null;
}
function cleanHtml(html) {
    // replace p tags with empty string
    html = html.replace(/<\/?p>/g, "");
    // replace a tags with empty string
    html = html.replace(/<a[^>]*>([^<]+)<\/a>/g, '');
    // replace new line characters with br tags
    html = html.replace(/\n/g, '<br>');
    // remove duplicate br tags
    html = html.replace(/(<br>\s*){2,}/gm, '<br>');
    // strip html comments
    html = html.replace(/<!--[^>]*-->/gm, '');
    // html decode
    html = html.replace(/&(nbsp|amp|quot|lt|gt);/g, "");
    // trim br tags
    html = html.replace(/(^(\s*<br>\s*)+|(<br>\s*)+$)/gm, '');
    return html.trim();
}
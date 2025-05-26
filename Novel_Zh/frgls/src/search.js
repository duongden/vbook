load('config.js');
function execute(key) {
    let browser = Engine.newBrowser();
    browser.launch(BASE_URL + "/s?q=" + key, 5000);

    let books = [];

    for (let i = 0; i < 5; i++) { //Retry max 5 times
        let doc = browser.html();
        let content = doc.select(".so_list");
        if (content.text().includes("加载中……")) {
            sleep(1000);
            continue;
        }
        doc.select(".bookbox").forEach(e => {
            books.push({
                name: e.select(".bookname").text(),
                link: BASE_URL + e.select(".bookname a").attr("href"),
                cover: e.select(".bookimg img").attr("src"),
                description: e.select(".author").text(),
                host: BASE_URL
            })
        });
        break;
    }

    browser.close();
    return Response.success(books);
}
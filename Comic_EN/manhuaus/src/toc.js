function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();

        let chapList = [];
        let el = doc.select(".listing-chapters_wrap li a");
        for (let i = el.length - 1; i >= 0; i--) {
            let e = el.get(i);
            chapList.push({
                name: e.text(),
                url: e.attr("href"),
                host: "https://manhuaus"
            });
        }
        return Response.success(chapList);
    }

    return null;
}
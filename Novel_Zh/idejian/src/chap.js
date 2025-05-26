function execute(chapterUrl) {

    // Chuyển đổi URL sang API của WeChat
    const apiUrl = chapterUrl
        .replace("https://www.idejian.com", "https://wechat.idejian.com/api/wechat")
        .replace(".html", "");

    // Gửi request đến API
    const response = fetch(apiUrl);

    if (response.ok) {
        const result = response.json();
        console.log(result.body.content);
        return Response.success(result.body.content);
    }
    // Chuyển đổi JSON

}

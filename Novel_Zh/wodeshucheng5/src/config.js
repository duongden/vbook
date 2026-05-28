var BASE_URL = "https://www.wodeshucheng5.com";

function absUrl(url) {
    url = (url || "") + "";
    if (!url) return "";
    if (url.indexOf("//") === 0) return "https:" + url;
    if (url.indexOf("http") === 0) return url.replace("http://www.wodeshucheng5.com", BASE_URL);
    if (url.indexOf("/") === 0) return BASE_URL + url;
    return BASE_URL + "/" + url;
}

function cleanText(text) {
    return ((text || "") + "").replace(/\s+/g, " ").trim();
}

function fetchDoc(url) {
    return fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
            "Referer": BASE_URL + "/"
        }
    });
}

function bookIdFromUrl(url) {
    url = (url || "") + "";
    var match = url.match(/book_(\d+)/);
    return match ? match[1] : "";
}

function bookUrl(id, page) {
    if (!page || page === 1) return BASE_URL + "/book_" + id + "/";
    return BASE_URL + "/book_" + id + "/" + page + "/";
}


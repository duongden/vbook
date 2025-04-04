var BASE_URL = "https://www.69shuba.com";  // Ưu tiên .com
var CDN_URL = "https://cdn.shucdn.com";  // cập nhật theo domain ảnh mới

if (typeof CONFIG_URL !== "undefined") {
    if (CONFIG_URL.indexOf("69shuba.cx") !== -1) {
        BASE_URL = "https://www.69shuba.cx";
        CDN_URL = "https://static.69shuba.cx";
    } else if (CONFIG_URL.indexOf("69shuba.com") === -1) {
        // fallback nếu không chứa .cx hay .com
        BASE_URL = "https://www.69shuba.com";
        CDN_URL = "https://static.69shuba.com";
    }
}

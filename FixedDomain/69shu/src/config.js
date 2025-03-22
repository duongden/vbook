var BASE_URL = "https://69shuba.cx";  // Ưu tiên .cx
var CDN_URL = "https://static.69shuba.com";  // cập nhật theo domain ảnh mới

if (typeof CONFIG_URL !== "undefined") {
    if (CONFIG_URL.indexOf("69shuba.com") !== -1) {
        BASE_URL = "https://69shuba.com";
        CDN_URL = "https://static.69shuba.cx";
    } else if (CONFIG_URL.indexOf("69shuba.cx") === -1) {
        // fallback nếu không chứa .cx hay .com
        BASE_URL = "https://69shuba.com";
        CDN_URL = "https://static.69shuba.com";
    }
}

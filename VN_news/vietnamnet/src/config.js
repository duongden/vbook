let BASE_URL = 'https://vietnamnet.vn';
try {
    if (CONFIG_URL) {
        BASE_URL = CONFIG_URL;
    }
} catch (error) {
}
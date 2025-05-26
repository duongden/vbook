let BASE_URL = 'http://www.tvdl.net';
try {
    if (CONFIG_URL) {
        BASE_URL = CONFIG_URL;
    }
} catch (error) {
}
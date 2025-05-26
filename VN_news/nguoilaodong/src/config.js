let BASE_URL = 'https://nld.com.vn';

try {
    if (CONFIG_URL) {
        BASE_URL = CONFIG_URL;
    }
} catch (error) {
}
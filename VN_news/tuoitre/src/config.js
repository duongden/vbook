let BASE_URL = 'https://tuoitre.vn';

try {
    if (CONFIG_URL) {
        BASE_URL = CONFIG_URL;
    }
} catch (error) {
}
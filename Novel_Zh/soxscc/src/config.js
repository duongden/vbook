let BASE_URL = 'https://www.soxscc.net';
try {
    if (CONFIG_URL) {
        BASE_URL = CONFIG_URL;
    }
} catch (error) {
}
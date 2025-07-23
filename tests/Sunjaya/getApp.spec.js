const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Untuk mengeklik tombol sumber aplikasi (seperti Google Play Store atau App Store) di website
 * 
 * Alur:
 * - Ambil locator berdasarkan jenis sumber dari konfigurasi (`config.web_source`)
 * - Pastikan tombol sumber terlihat di halaman
 * - Klik tombol tersebut untuk membuka link ke sumber aplikasi
 * 
 * @param {object} webApp - Objek browser Playwright 
 * @param {string} type - Jenis sumber aplikasi yang ingin diklik 
 */

// Helper function to click media sosial 
async function clickSource(webApp, type) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Clicking website source: ${type}',
    });

    const googlePlayBtn = webApp.locator(config.web_source[type]);
    await expect(googlePlayBtn).toBeVisible();
    await googlePlayBtn.click();

    // AKTIFKAN JIKA INGIN MENGUJI TOMBOL LAINNYA 
    // const appStoreBtn = webApp.locator(config.web_source.appstore);
    // await expect(appStoreBtn).toBeVisible();
    // await appStoreBtn.click();
}

/**
 * Pengujian utama untuk fitur klik tombol sumber aplikasi (Get App)
 * 
 * Tujuan:
 * - Memastikan bahwa tombol sumber seperti Google Play Store dapat muncul di halaman
 * - Memverifikasi bahwa tombol dapat diklik dan mengarahkan ke halaman yang sesuai
 * 
 * Allure Labels:
 * - feature: get app page
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('clicking source', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: get app page',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'severity: normal',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'platform: web',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'status: pass',
    });          

    // Start the access to click the webpage source
    await clickSource(webApp, 'googlestore');
});
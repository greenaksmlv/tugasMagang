const { config } = require('../../config');
const { test, expect } = require('../setup');


/**
 * Fungsi: 
 * - Untuk mengakses dan memverifikasi halaman "Shuttle"
 * 
 * Alur:
 * - Cari menu "Shuttle" di halaman utama
 * - Klik menu/tombol tersebut untuk berpindah ke halaman Shuttle
 * - Verifikasi bahwa judul "Shuttle Kami" muncul sebagai indikator halaman berhasil dimuat
 * 
 * @param {object} webApp - Objek browser Playwright 
 */


// Helper function to check shuttle
async function shuttleInfo(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to shuttle page',
    });

    const shuttlePath = webApp.locator(`xpath=//a[normalize-space()='Shuttle']`);

    await shuttlePath.click();
    await expect(webApp.locator(`xpath=//h3[normalize-space()='Shuttle Kami']`)).toBeVisible();
}


/**
 * Pengujian utama untuk fitur halaman "Shuttle"
 * 
 * Tujuan:
 * - Memastikan bahwa pengguna dapat mengakses halaman Shuttle
 * - Memverifikasi elemen judul "Shuttle Kami" muncul sebagai tanda bahwa halaman berhasil dimuat
 * 
 * Allure Labels:
 * - feature: shuttle page
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('shuttle info', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: shuttle page',
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

    // Start the access to shuttle page
    await shuttleInfo(webApp);
});
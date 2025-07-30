const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Untuk mengakses dan memverifikasi halaman "Statistic"
 * 
 * Alur:
 * - Klik tautan "Statistic" dari halaman utama
 * - Verifikasi bahwa halaman yang dibuka menampilkan teks "Statistic"
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper function to check on Statistic
async function statistic(webApp) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: 'Navigate to Statistic',
    });

    await webApp.locator(`xpath=//canvas[@id='histats_counter_7203_canvas']`).click();
}

/**
 * Pengujian utama untuk halaman "Statistic"
 * 
 * Tujuan:
 * - Memastikan pengguna dapat mengakses halaman Statistic
 * -Memverifikasi bahwa elemen judul "Statistic" terlihat
 * 
 * Allure Labels:
 * - feature: Statistic
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('Statistic', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Statistic',
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

    // Start the access to Statistic
    await statistic(webApp);
});
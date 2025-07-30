const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Untuk mengakses dan memverifikasi halaman "Paket Wisata"
 * 
 * Alur:
 * - Klik tautan "Paket Wisata" dari halaman utama
 * - Verifikasi bahwa halaman yang dibuka menampilkan teks "Paket Wisata"
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper function to check on Tour Package
async function tourPackage(webApp) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: 'Navigate to Tour Package',
    });

    await webApp.locator(`xpath=//a[normalize-space()='PRODUCT']`).first().click();

    const religiousPackagePath = webApp.locator(`xpath=//a[normalize-space()='PAKET WISATA']`);
    await religiousPackagePath.isVisible();
    await religiousPackagePath.click();

    await expect (webApp.locator(`xpath=//h3[normalize-space()='PAKET WISATA']`)).toBeVisible();
}

/**
 * Pengujian utama untuk halaman "Paket Wisata"
 * 
 * Tujuan:
 * - Memastikan pengguna dapat mengakses halaman Paket Wisata
 * -Memverifikasi bahwa elemen judul "Paket Wisata" terlihat
 * 
 * Allure Labels:
 * - feature: Tour Package
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('Tour Package', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Tour Package',
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

    // Start the access to Tour Package
    await tourPackage(webApp);
});
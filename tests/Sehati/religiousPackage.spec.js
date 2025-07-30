const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Untuk mengakses dan memverifikasi halaman "Paket Religi"
 * 
 * Alur:
 * - Klik tautan "Paket Religi" dari halaman utama
 * - Verifikasi bahwa halaman yang dibuka menampilkan teks "Paket Religi"
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper function to check on Religious Package
async function religiousPackage(webApp) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: 'Navigate to Religious Package',
    });

    await webApp.locator(`xpath=//a[normalize-space()='PRODUCT']`).first().click();

    const religiousPackagePath = webApp.locator(`xpath=//a[normalize-space()='PAKET RELIGI']`);
    await religiousPackagePath.isVisible();
    await religiousPackagePath.click();

    await expect (webApp.locator(`xpath=//h3[normalize-space()='PAKET RELIGI']`)).toBeVisible();
}

/**
 * Pengujian utama untuk halaman "Paket Religi"
 * 
 * Tujuan:
 * - Memastikan pengguna dapat mengakses halaman Paket Religi
 * -Memverifikasi bahwa elemen judul "Paket Religi" terlihat
 * 
 * Allure Labels:
 * - feature: Religious Package
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('Religious Package', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Religious Package',
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

    // Start the access to Religious Package
    await religiousPackage(webApp);
});
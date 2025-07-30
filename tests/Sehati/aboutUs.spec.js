const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Untuk mengakses dan memverifikasi halaman "About Us"
 * 
 * Alur:
 * - Klik tautan "About Us" dari halaman utama
 * - Verifikasi bahwa halaman yang dibuka menampilkan teks "About Us"
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper function to check on About Us
async function aboutUs(webApp) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: 'Navigate to About Us',
    });

    await webApp.locator(`xpath=//a[normalize-space()='About Us']`).click();

    // Expect the page to have the text
    await expect(webApp.locator(`xpath=//h1[normalize-space()='PROFIL']`)).toBeVisible();
}

/**
 * Pengujian utama untuk halaman "About Us"
 * 
 * Tujuan:
 * - Memastikan pengguna dapat mengakses halaman About Us
 * -Memverifikasi bahwa elemen judul "About Us" terlihat
 * 
 * Allure Labels:
 * - feature: About Us
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('About Us', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: About Us',
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

    // Start the access to About Us
    await aboutUs(webApp);
});
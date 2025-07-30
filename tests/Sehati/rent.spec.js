const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Untuk mengakses dan memverifikasi halaman "Rent"
 * 
 * Alur:
 * - Klik tautan "Rent" dari halaman utama
 * - Verifikasi bahwa halaman yang dibuka menampilkan teks "Rent"
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper function to check on Rent
async function rent(webApp) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: 'Navigate to Rent',
    });

    await webApp.locator(`xpath=//a[normalize-space()='Sewa Mobil']`).click();

    // Expect the page to have the text
    await expect(webApp.locator(`xpath=//h5[normalize-space()='Anda Butuh Bantuan?']`)).toBeVisible();
}

/**
 * Pengujian utama untuk halaman "Rent"
 * 
 * Tujuan:
 * - Memastikan pengguna dapat mengakses halaman Rent
 * -Memverifikasi bahwa elemen judul "Rent" terlihat
 * 
 * Allure Labels:
 * - feature: Rent
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('Rent', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Rent',
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

    // Start the access to Rent
    await Rent(webApp);
});
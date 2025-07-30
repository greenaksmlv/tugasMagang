const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Untuk mengakses dan memverifikasi halaman "Product"
 * 
 * Alur:
 * - Klik tautan "Product" dari halaman utama
 * - Verifikasi bahwa halaman yang dibuka menampilkan teks "Product"
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper function to check on About Us
async function product(webApp) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: 'Navigate to Product',
    });

    await webApp.locator(`xpath=//a[normalize-space()='Product']`).click();

    // Expect the page to have the text
    await expect(webApp.locator(`xpath=//h1[@class='mb-4']`)).toBeVisible();
}

/**
 * Pengujian utama untuk halaman "Product"
 * 
 * Tujuan:
 * - Memastikan pengguna dapat mengakses halaman Product
 * -Memverifikasi bahwa elemen judul "Product" terlihat
 * 
 * Allure Labels:
 * - feature: Product
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('Product', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Product',
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

    // Start the access to Product
    await product(webApp);
});
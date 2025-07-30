const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Untuk mengakses dan memverifikasi halaman "Pembuatan Dokumen"
 * 
 * Alur:
 * - Klik tautan "Pembuatan Dokumen" dari footer halaman utama
 * - Verifikasi bahwa halaman yang dibuka menampilkan teks
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper function to check on document creation
async function documentCreation(webApp) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: 'Navigate to document creation',
    });

    await webApp.locator(`xpath=//a[normalize-space()='Pembuatan Dokumen']`).click();

    // Expect the page to have the text KEBIJAKAN PRIVASI
    await expect(webApp.locator(`xpath=//h1[@class='mb-4']`)).toBeVisible();
}

/**
 * Pengujian utama untuk halaman "document creation"
 * 
 * Tujuan:
 * - Memastikan pengguna dapat mengakses halaman document creation
 * - Memverifikasi bahwa elemen judul "document creation" terlihat
 * 
 * Allure Labels:
 * - feature: Document Creation
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('document creation', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Document Creation',
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

    // Start the access to document creation
    await documentCreation(webApp);
});
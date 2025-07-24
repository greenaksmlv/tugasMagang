const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Untuk mengakses halaman "Tentang"
 * 
 * Alur:
 * - Klik tautan "Tentang" di halaman utama
 * - Verifikasi bahwa elemen judul muncul di halaman
 * 
 * @param {object} webApp - Objek browser Palywright 
 */

// Helper function to check on Tentang
async function about(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Tentang page',
    });

    const aboutPath = webApp.locator(`xpath=//a[normalize-space()='Tentang']`);
    await aboutPath.click();
    await expect(webApp.locator(`xpath=//h1[normalize-space()='PO Wisata Komodo']`)).toBeVisible();
}

/**
 * Pengujian utama untuk halaman "Tentang"
 * 
 * Tujuan:
 * - Memastikan bahwa halaman Tentang  dapat diakses
 * - Memverifikasi bahwa konten utama judul tampil
 * 
 * Allure Labels:
 * - feature: about page
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('about', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: about us page',
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
    
    // Start the about Day Trans page
    await about(webApp);
})
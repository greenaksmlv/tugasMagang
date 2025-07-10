const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Untuk mengakses halaman "Tentang" dan memverifikasi informasi tentang DayTrans
 * 
 * Alur:
 * - Klik tautan "Tentang" di halaman utama
 * - Verifikasi bahwa elemen berjudul "DayTrans Shuttle" muncul di halaman
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
    await expect(webApp.locator(`xpath=//h3[normalize-space()='DayTrans Shuttle']`)).toBeVisible();
}

/**
 * Pengujian utama untuk halaman "Tentang"
 * 
 * Tujuan:
 * - Memastikan bahwa halaman Tentang DayTrans dapat diakses
 * - Memverifikasi bahwa konten utama seperti judul "DayTrans Shuttle" tampil
 * 
 * Allure Labels:
 * - feature: about page
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('about Day Trans', async ({ webApp }) => {
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
    
    // Start the about Day Trans page
    await about(webApp);
})
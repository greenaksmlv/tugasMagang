const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi: 
 * - Untuk mengakses dan memverifikasi halaman "Syarat dan Ketentuan"
 * 
 * Alur:
 * - Klik menu "Syarat dan Ketentuan" dari halaman utama
 * - Klik item informasi "Syarat dan Ketentuan Shuttle"
 * - Verifikasi bahwa konten detail berjudul "SYARAT DAN KETENTUAN" muncul
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper function to check syarat & ketentuan
async function termsConditions(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to terms and conditions page',
    });

    await webApp.locator(`xpath=//a[normalize-space()='Syarat dan Ketentuan']`).click();

    // click the information of terms and conditions
    await webApp.locator(`xpath=//p[normalize-space()='Syarat dan Ketentuan Shuttle']`).click();
    
    // wait for the detail information to be visible
    await expect(webApp.locator(`xpath=//strong[normalize-space()='SYARAT DAN KETENTUAN']`)).toBeVisible();
}

/**
 * Pengujian utama untuk halaman "Syarat dan Ketentuan"
 * 
 * Tujuan:
 * - Memastikan halaman "Syarat dan Ketentuan" dapat diakses
 * - Memverifikasi bahwa detail informasi dapat dibuka dan terlihat
 * 
 * Allure Labels:
 * - feature: terms and conditions
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('terms & conditions', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: how to pay page',
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

    // Start the how to pay process
    await termsConditions(webApp);
});
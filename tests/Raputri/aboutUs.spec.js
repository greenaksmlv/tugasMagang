const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Menavigasi ke halaman "Tentang" pada situs Raputri.
 *
 * Alur:
 * - Klik menu "Tentang" di navigasi atas
 * - Verifikasi bahwa logo utama muncul di halaman yang dimuat
 *
 * @param {object} webApp - Objek halaman dari Playwright
 */

// Helper function to check on Tentang
async function about(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Tentang page',
    });

    const aboutPath = webApp.locator(`xpath=//a[normalize-space()='Tentang']`);
    await aboutPath.click();
    await expect(webApp.locator(`xpath=//img[@src='/default/raputri/images/icon/logo.png']`)).toBeVisible();
}

// Main test
test('about Raputri', async ({ webApp }) => {
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
    
    // Start the about Raputri page
    await about(webApp);
})
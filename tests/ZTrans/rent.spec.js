const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Menavigasi ke halaman rental
 * 
 * Alur:
 * - Temukan elemen menu rental
 * - Klik elemen tersebut untuk memuat halaman rental
 * - Verifikasi elemen konten utama rental muncul
 * 
 * @param {object} webApp - Objek halaman (browser context) dari Playwright
 */

// Helper function to check on rental
async function rent(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Rental page',
    });

    const rentPath = webApp.locator(`xpath=//a[normalize-space()='Rental']`);
    await rentPath.isVisible();
    await rentPath.click();

    // Expect the page to have text
    await expect(webApp.locator(`xpath=//h1[contains(text(),'🚗 Sewa Mobil Mudah & Cepat')]`)).toBeVisible();
}

// Main test
test('rent', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Access to rental',
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

    // Start to access rental
    await rent(webApp);
});
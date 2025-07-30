const { config } = require('../../config');
const { test, expect } = require('../setup');

test.setTimeout(120_000);

/**
 * Fungsi:
 * - Menavigasi ke halaman "Service"
 *
 * Alur:
 * - Temukan elemen navbar "Service"
 * - Klik untuk membuka halaman Service
 * - Verifikasi elemen heading utama muncul
 *
 * @param {object} webApp - Objek halaman dari Playwright (browser context)
 */

// Helper funtion to check on service
async function service(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to service Page',
    });

    const servicePath = webApp.locator(`xpath=//a[normalize-space()='Services']`);
    await servicePath.isVisible();
    await servicePath.click();

    // Expect the page to have text
    await expect(webApp.locator(`xpath=//h1[@class='mb-4']`)).toBeVisible(); 
}

// Main test
test('service', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Access to service',
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

    // Start to access service
    await service(webApp);
});

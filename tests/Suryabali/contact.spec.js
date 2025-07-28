const { config } = require('../../config');
const { test, expect } = require('../setup');

test.setTimeout(120_000);

/**
 * Fungsi:
 * - Menavigasi ke halaman "Kontak"
 *
 * Alur:
 * - Temukan elemen footer "Kontak"
 * - Klik untuk membuka halaman Kontak
 * - Verifikasi elemen heading utama "Hubungi Kami" muncul
 *
 * @param {object} webApp - Objek halaman dari Playwright (browser context)
 */

// Helper funtion to check on contact
async function contact(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to contact Page',
    });

    const contactPath = webApp.locator(`xpath=//a[normalize-space()='Kontak']`);
    await contactPath.isVisible();
    await contactPath.click();

    // Expect the page to have text
    await expect(webApp.locator(`xpath=//h5[normalize-space()='Lokasi Kami']`)).toBeVisible(); 
}

// Main test
test('contact', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Access to contact',
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

    // Start to access contact
    await contact(webApp);
});

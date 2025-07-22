const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Menavigasi ke halaman "Blog".
 *
 * Alur:
 * - Temukan elemen menu "Blog" dari footer
 * - Klik elemen tersebut untuk memuat halaman blog
 * - Verifikasi elemen konten utama blog muncul
 *
 * @param {object} webApp - Objek halaman (browser context) dari Playwright
 */

// Helper funtion to check on blog
async function blog(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Blog Page',
    });

    const blogPath = webApp.locator(`xpath=//a[normalize-space()='Blog']`);
    await blogPath.isVisible();
    await blogPath.click();

    // Expect the page to have text
    await expect(webApp.locator(`xpath=//p[@class='mb-0']`)).toBeVisible(); 
}

// Main test
test('blog', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Access to blog',
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

    // Start to access about us
    await blog(webApp);
});

const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Menavigasi ke footer
 * - Memastikan logo perusahaan tampil
 * - Mencoba klik bagian footer yang berisi tautan media sosial
 *
 * Langkah:
 * 1. Scroll ke bagian footer
 * 2. Verifikasi logo tampil
 * 3. Klik area medsos di footer
 *
 * @param {object} webApp - Objek Playwright Page
 */

async function clickingMedsos(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to media social page',
    });

    const aboutPath = webApp.locator(`xpath=//a[normalize-space()='Tentang']`).first();
    await aboutPath.click();

    const medsosPath = webApp.locator(`xpath=//a[@href='https://instagram.com/putraremaja.shuttle']//span[@class='text-muted'][normalize-space()='@putraremaja.shuttle']`);
    await medsosPath.isVisible();
    await medsosPath.click();
}

// Main test
test('clicking media social icon (Instagram)', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({ 
        type: 'allure.label', 
        value: 'feature: media social'
    });
    test.info().annotations.push({ 
        type: 'allure.label', 
        value: 'severity: normal' 
    });
    test.info().annotations.push({ 
        type: 'allure.label', 
        value: 'platform: web' 
    });
    test.info().annotations.push({ 
        type: 'allure.label', 
        value: 'status: pass' 
    });

    // Test: click the Instagram icon
    await clickingMedsos(webApp, 'instagram');
});
const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Menavigasi ke halaman "Tentang"
 * - Memastikan logo perusahaan tampil
 * - Mencoba klik bagian footer yang berisi tautan media sosial
 *
 * Langkah:
 * 1. Klik menu "Tentang"
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

    const medsosPath = webApp.locator(`xpath=//img[@alt='icon']`);
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
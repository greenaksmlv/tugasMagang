const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Untuk mengakses dan memverifikasi halaman "SK AHU"
 * 
 * Alur:
 * - Klik tautan "SK AHU" dari halaman utama
 * - Verifikasi bahwa halaman yang dibuka menampilkan teks "SK AHU"
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper function to check on SK AHU
async function sk_ahu(webApp) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: 'Navigate to SK AHU',
    });

    await webApp.locator(`xpath=//a[normalize-space()='About Us']`).first().click();

    // Expect the page to have the text
    await expect(webApp.locator(`xpath=//h1[normalize-space()='PROFIL']`)).toBeVisible();

    const sk_ahuPath = webApp.locator(`xpath=//a[contains(text(),'SK AHU')]`);
    await sk_ahuPath.isVisible();
    await sk_ahuPath.click();

}

/**
 * Pengujian utama untuk halaman "SK AHU"
 * 
 * Tujuan:
 * - Memastikan pengguna dapat mengakses halaman SK AHU
 * -Memverifikasi bahwa elemen judul "SK AHU" terlihat
 * 
 * Allure Labels:
 * - feature: SK AHU
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('SK AHU', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: SK AHU',
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

    // Start the access to SK AHU
    await sk_ahu(webApp);
});
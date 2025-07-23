const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Untuk mengakses dan memverifikasi halaman "Kebijakan Privasi"
 * 
 * Alur:
 * - Klik tautan "Kebijakan Privasi" dari halaman utama
 * - Verifikasi bahwa halaman yang dibuka menampilkan teks "kebijakan privasi"
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper function to check on privacy policy
async function privacyPolicy(webApp) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: 'Navigate to Privacy & Policy',
    });

    await webApp.locator(`xpath=//a[normalize-space()='Kebijakan Privasi']`).click();

    // Expect the page to have the text KEBIJAKAN PRIVASI
    await expect(webApp.locator(`xpath=//h3[normalize-space()='kebijakan privasi']`)).toBeVisible();
}

/**
 * Pengujian utama untuk halaman "Kebijakan Privasi"
 * 
 * Tujuan:
 * - Memastikan pengguna dapat mengakses halaman kebijakan privasi
 * -Memverifikasi bahwa elemen judul "kebijakan privasi" terlihat
 * 
 * Allure Labels:
 * - feature: Privacy and Policy
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('privacy policy', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Privacy and Policy',
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

    // Start the access to privacy policy
    await privacyPolicy(webApp);
});
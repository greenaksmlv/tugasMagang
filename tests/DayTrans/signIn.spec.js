const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Klik tombol "Masuk" pada halaman utama
 * - Verifikasi bahwa halaman login terbuka dengan judul "Masuk Dengan"
 * - Ambil tombol metode login berdasarkan konfigurasi
 * - Klik tombol metode login tersebut
 * 
 * @param {object} webApp - Objek browser Playwright 
 * @param {string} method - Jenis metode login yang digunakan 
 */

// Helper function to Sign In
async function signIn(webApp, method) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Sign in with method: ${method}',
    });

    await webApp.locator(`xpath=//a[normalize-space()='Masuk']`).click();
    await expect(webApp.locator(`xpath=//h4[normalize-space()='Masuk Dengan']`)).toBeVisible();

    const selector = config.sign_methods[method];
    const button = webApp.locator(selector);
    await expect(button).toBeVisible();
    await button.click();
}

/**
 * Pengujian utama untuk fitur "Sign In"
 * 
 * Tujuan:
 * - Memastikan bahwa pengguna dapat mengakses halaman login
 * - Memverifikasi bahwa metode login yang dipilih dapat diklik
 * 
 * Allure Labels:
 * - feature: sign in page
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('sign in', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: sign in page',
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

    // Start the access to sign in page
    await signIn(webApp, 'phone');
});


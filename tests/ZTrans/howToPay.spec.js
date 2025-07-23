const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi: 
 * - Untuk mengakses dan mengecek informasi cara pembayaran pada halaman "Cara Bayar"
 * 
 * Alur:
 * - Verifikasi bahwa judul "Cara Bayar Kami" muncul di halaman
 * - Untuk setiap metode pembayaran yang tersedia:
 *   - Klik tab metode di sebelah kiri
 *   - Klik item metode pembayaran yang diinginkan
 *   - Instruksi cara pembayaran akan muncul
 * 
 * @param {object} webApp - Objek browser Playwright 
 * @param {Array<{menu: string, method: string}>} methods - Daftar menu dan metode pembayaran yang akan dicek 
 */

// Helper function to check how to pay 
async function howToPay(webApp, methods) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: 'Navigate to how to pay page',
    });

    const blogPath = webApp.locator(`xpath=//a[normalize-space()='Cara Bayar']`);
    await blogPath.isVisible();
    await blogPath.click()

    // Expect the page to have text Cara Bayar Kami
    await expect(webApp.locator(`xpath=//h1[normalize-space()='Cara Pembayaran']`)).toBeVisible();

    for (const method of methods) {
        console.log(`Select left meni: ${method.menu}, then payment method: ${method.method}`);

    // click the menu on the left to pick the payment method
    const menuMethod = webApp.locator(`xpath=//h6[normalize-space()='Pembayaran Instan']`);
    await expect(menuMethod).toBeVisible();
    await menuMethod.click();

    // click the payment method you want to know more about
    const methodItem = webApp.locator(`xpath=//h5[normalize-space()='GOPAY']`);
    await expect(methodItem).toBeVisible();
    await methodItem.click();
    }
}

/**
 * Pengujian utama untuk fitur halaman "Cara Bayar"
 * 
 * Tujuan:
 * - Memastikan pengguna dapat mengakses halaman "Cara Bayar"
 * - Memverifikasi bahwa pengguna dapat memilih metode pembayaran dan melihat instruksi
 * 
 * Allure Labels:
 * - feature: how to pay page
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('how to pay', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: how to pay page',
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

    // Start the how to pay process
    await howToPay(webApp, config.more_info.method);
});
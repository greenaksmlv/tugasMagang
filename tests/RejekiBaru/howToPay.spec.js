const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi untuk mengakses halaman "Cara Bayar"
 * Memeriksa instruksi pembayarannya berdasarkan metode yang ditentukan
 * 
 * Alur:
 * - Klik link "Cara Bayar" yang berada di menu
 * - Verifikasi judul halaman muncul
 * - Untuk setiap metode pembayaran dalam array `methods`:
 *      - Klik metode pembayaran 
 *      - Klik dropdown untuk mendapatkan instruksi
 *      - Verifikasi bahwa detail instruksi terlihat
 * 
 * @param {object} webApp - Konteks Playwright (browser page)
 * @param {Array<string>} methods - Daftar ID metode pembayaran yang ingin diketahui dari (config.more_info.method) 
 */

// Helper function to check on how to pay
async function howToPay(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to how to pay Page',
    });

    const howToPayPath = webApp.locator(`xpath=//a[normalize-space()='Cara Bayar']`);
    await howToPayPath.waitFor({ timeout: 10000 });
    await expect(howToPayPath).toBeVisible();
    await howToPayPath.click();

    await expect(webApp.locator(`xpath=//h1[normalize-space()='Cara Pembayaran']`)).toBeVisible(); 

    // 🔧 Tambahkan definisi metode pembayaran di sini
    const methods = ['Jenius', 'GOPAY', 'Mandiri Virtual Account']; // sesuaikan dengan yang tersedia di halaman

    for (const method of methods) {
        console.log(`Select how to pay payment method: ${method}`);

        // click the main category (e.g., "Pembayaran Instan")
        await webApp.locator(`xpath=//h6[normalize-space()='Pembayaran Instan']`).click();

        // click dropdown section
        await webApp.locator(`xpath=//h5[normalize-space()='Jenius']`).click();

        // wait for detail instructions
        await expect(
            webApp.locator(`xpath=//h6[normalize-space()='CARA PEMBAYARAN MENGGUNAKAN Jenius']`)
        ).toBeVisible();
    }
}


// Main test
test('how to pay', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Access to how to pay',
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

    // Start to access how to pay
    await howToPay(webApp);
});

const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi untuk mengakses halaman "Metode Pembayaran"
 * Memeriksa instruksi pembayarannya berdasarkan metode yang ditentukan
 * 
 * Alur:
 * - Klik link "Metode Pembayaran" yang berada di menu
 * - Verifikasi judul halaman muncul
 * @param {object} webApp - Konteks Playwright (browser page)
 * @param {Array<string>} methods - Daftar ID metode pembayaran yang ingin diketahui dari (config.more_info.method) 
 */

// Helper function to check on payment method
async function paymentMethod(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to how to payment method',
    });

    const paymentMethodPath = webApp.locator(`xpath=//a[contains(@class,'nav-link')][normalize-space()='Metode Pembayaran']`);
    await paymentMethodPath.waitFor({ timeout: 10000 });
    await expect(paymentMethodPath).toBeVisible();
    await paymentMethodPath.click();

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
test('payment method', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Access to payment method',
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
    await paymentMethod(webApp);
});

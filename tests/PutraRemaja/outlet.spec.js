const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Untuk mengakses halaman daftar outlet Minaga Express dari menu navigasi
 * 
 * Alur:
 * - Klik menu dropdown navigasi utama
 * - Pilih opsi "Outlet" dari menu dropdown
 * - Verifikasi bahwa halaman "Temukan Outlet Kami!" muncul
 * - Klik tombol "Lihat Semua" untuk membuka detail outlet
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper function to check on outlet
async function checkOutlet(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Outlet page',
    });

    const outletPath = webApp.locator(`xpath=//a[normalize-space()='Outlet']`);
    await outletPath.click();

    // Expect the page to have text temukan outlet kami!
    await expect(webApp.locator(`xpath=//h1[normalize-space()='Lokasi Outlet kami tersebar di berbagai tempat']`)).toBeVisible();
}

/**
 * Pengujian utama untuk halaman Outlet
 * 
 * Tujuan:
 * - Memastikan halaman outlet dapat diakses melalui dropdown navigasi
 * - Memverifikasi bahwa tombol untuk melihat semua outlet dapat diklik
 * 
 * Allure Labels:
 * - feature: outlet page
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('outlet', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Access to outlet',
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

    // Start to access outlet
    await checkOutlet(webApp);
});


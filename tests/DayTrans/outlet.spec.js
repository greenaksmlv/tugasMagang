const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Untuk mengakses halaman daftar outlet DayTrans dari menu navigasi
 * 
 * Alur:
 * - Klik menu dropdown navigasi utama
 * - Pilih opsi "Outlet" dari menu dropdown
 * - Verifikasi bahwa halaman "Temukan Outlet Kami!" muncul
 * - Klik tombol "Lihat Semua" untuk membuka detail outlet di bandung
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper function to check on outlet
async function checkOutlet(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Outlet page',
    });

    const dropdownMenu = webApp.locator(`xpath=//a[@id='navbarDropdown']`);
    await dropdownMenu.click();

    const outletPath = webApp.locator(`xpath=//a[@class='dropdown-item'][normalize-space()='Outlet']`);
    await outletPath.click();

    // Expect the page to have text temukan outlet kami!
    await expect(webApp.locator(`xpath=//h2[contains(text(),'Temukan')]`)).toBeVisible();

    // click to see all the schedule
    const lihatSemua = webApp.locator(`xpath=//a[@href='https://www.daytrans.co.id/outlet/detail?outlet_kota=BANDUNG']`);
    await lihatSemua.click();
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

    // Start to access outlet
    await checkOutlet(webApp);
});


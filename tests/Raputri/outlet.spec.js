const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Mengakses halaman "Outlet" dan memverifikasi teks utama pada halaman.
 *
 * Langkah-langkah:
 * 1. Cari elemen navbar dengan label "Outlet"
 * 2. Klik elemen tersebut
 * 3. Verifikasi bahwa elemen heading dengan teks
 *    "Lokasi Outlet kami tersebar di berbagai tempat" muncul
 *
 * @param {object} webApp - Konteks halaman dari Playwright
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


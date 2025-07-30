const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Untuk mengakses dan memverifikasi halaman "Transportasi & Akomodasi"
 * 
 * Alur:
 * - Klik tautan "Transportasi & Akomodasi" dari halaman utama
 * - Verifikasi bahwa halaman yang dibuka menampilkan teks "Transportasi & Akomodasi"
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper function to check on Transportation & Accomodation
async function transportAndAccomodation(webApp) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: 'Navigate to Transportation & Acomodation',
    });

    await webApp.locator(`xpath=//a[normalize-space()='Transportasi & Akomodasi']`).click();

    // Expect the page to have the text
    await expect(webApp.locator(`xpath=//h5[normalize-space()='Anda Butuh Bantuan?']`)).toBeVisible();
}

/**
 * Pengujian utama untuk halaman "Transport and Accomodation"
 * 
 * Tujuan:
 * - Memastikan pengguna dapat mengakses halaman Transport and Accomodation
 * -Memverifikasi bahwa elemen judul "Transport and Accomodation" terlihat
 * 
 * Allure Labels:
 * - feature: Transport and Accomodation
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('Transport and Accomodation', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Transport and Accomodation',
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

    // Start the access to Transport and Accomodation
    await transportAndAccomodation(webApp);
});
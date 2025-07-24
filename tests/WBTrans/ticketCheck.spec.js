const { config }= require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Mengisi kolom kode booking dan menekan tombol "Cek Tiket"
 *
 * Alur:
 * 1. Klik link "Cek Tiket"
 * 2. Isi input kode booking dari `config.booking_code.packet`
 * 3. Klik tombol "Cek Pesanan"
 *
 * @param {object} webApp - Objek Playwright (halaman web)
 */

// Helper function to check on ticket
async function ticketCheck(webApp, codeBooking) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Check on ticket',
    });

    try {
        await webApp.locator(`xpath=//a[normalize-space()='Cek Tiket']`).click();
        await webApp.locator(`xpath=//input[@placeholder='Masukan Kode Disini']`).fill(codeBooking);
        await webApp.locator(`xpath=//button[normalize-space()='Cek Pesanan']`).click();
    } catch (error) {
        test.fail(`Error in ticketCheck: ${error.message}`);
        throw error;
    }    
}

// Main test 
test('ticketCheck', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: ticket check',
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
    
    try {
        // Starting the tracking process
        await ticketCheck(webApp, config.booking_code.packet);
    } catch (error) {
        // Handle any error that might occur during the test
        test.fail(`Test failed: ${error.message}`);
        throw error; 
    }
});
const { config } = require('../../config');
const { test, expect } = require('../setup');

test.setTimeout(60000);

/**
 * Fungsi:
 * - Untuk mengakses halaman "Cek Paket" dari dropdown dan memastikan modal form pelacakan muncul
 * 
 * Alur:
 * - Klik dropdown "Paket"
 * - Pilih menu "Cek Paket"
 * - Verifikasi bahwa modal form dengan judul "Cek Resi Paket Anda" muncul
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper function to lacak paket
async function packetTracking(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to cek paket page',
    });

    try{ 
        const dropdownMenu = webApp.locator(`xpath=//a[@id='dropdown-paket']`);
        await dropdownMenu.click();

        const checkPacketPath = webApp.locator(`xpath=//a[normalize-space()='Cek Paket']`);
        await checkPacketPath.click();

        // Expect the page to have text cek resi paket anda
        await expect(webApp.locator(`xpath=//div[@class='modal-header']`)).toBeVisible();
    } catch (error) {
        test.fail(`Error in packetTracking: ${error.message}`);
        throw error;
    }
}

/**
 * Fungsi:
 * - Untuk mengisi nomor resi dan menampilkan hasil pelacakan paket
 * 
 * Alur:
 * - Isi input resi dengan kode booking
 * - Klik tombol "Kirim"
 * - Varifikasi bahwa hasil pelacakan muncul
 * 
 * @param {object} webApp - Objek browser Playwright 
 * @param {string} codeBooking - Nomor resi/kode booking 
 */

// Helper function to insert packet resi
async function dataTracking(webApp, codeBooking) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Input booking code and track packet',
    });

    try {
        const inputResi = webApp.locator(`xpath=//input[@placeholder='Silahkan Masukan Nomor Resi Paket']`);
        await expect(inputResi).toBeVisible();
        await inputResi.fill(codeBooking);

        const btnTrack = webApp.locator(`xpath=//button[normalize-space()='Kirim']`);
        await expect(btnTrack).toBeEnabled();
        await btnTrack.click();

        const result = webApp.locator(`xpath=//div[contains(@class, 'tracking-result')]`);
        await expect(result).toBeVisible({ timeout: 10000 });
    } catch (error) {
        test.fail(`Error in dataTracking: ${error.message}`);
        throw error;
    }
}

/**
 * Pengujian utama untuk fitur pelacakan resi/paket
 * 
 * Tujuan:
 * - Memastikan pengguna dapat membuka form pelacakan paket dari menu "Cek Paket"
 * - Memastikan pengguna dapat menginput resi dan melihat hasil pelacakan
 * 
 * Allure Labels:
 * - feature: Tracking Packet
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test 
test('packetTracking', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Tracking Packet',
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
        await packetTracking(webApp);
        await dataTracking(webApp, config.booking_code.packet);
    } catch (error) {
        console.error(`Test failed: ${error.message}`);
        // Handle any error that might occur during the test
        test.info().annotations.push({
            type: 'allure.step',
            value: `Error occures: ${error.message}`,
        });
        throw error;
    }
});
const { channel } = require('diagnostics_channel');
const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi: 
 * - Untuk melakukan pengecekan kode booking pada halaman "Cek Booking"
 * 
 * Alur:
 * - Cari tombol "Cek Booking" di halaman utama
 * - Pastikan tombol terlihat
 * - Klik link untuk menuju ke halaman Cek Booking
 * 
 * JIKA KODE BOOKING VALID:
 * - Masukkan kode booking ke dalam kolom input dengan placeholder 'Masukan Kode Booking Anda!'
 * - Klik tombol "KIRIM"
 * - Cetak URL setelah navigasi
 * 
 * JIKA KODE BOOKING TIDAK VALID:
 * - Isi kolom dengan placeholder 'Kode Booking' menggunakan teks "codeBooking"
 * - Klik tombol "Cek Reservasi"
 * - Log akan muncul bahwa kode tidak ditemukan
 * 
 * @param {object} webApp - Objek browser Playwright
 * @param {string} codeBooking - Kode booking yang akan dicek
 */

// Helper function to check booking code
async function reservationCheck(webApp, codeBooking) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Check Booking Code',
    });

    const reservationBookingPath = webApp.locator(`xpath=//a[normalize-space()='Cek Booking']`);
    await expect(reservationBookingPath).toBeVisible({ timeout: 1000 });

    if(codeBooking != ''){
        await reservationBookingPath.click();
        console.log(`Code Booking ${codeBooking}`);
        await webApp.locator(`xpath=//input[@placeholder='Masukan Kode Booking Anda !']`).fill(codeBooking);
        await webApp.locator(`xpath=//button[normalize-space()='KIRIM']`).click();

        // Get the current URL after navigation
        const currentUrl = webApp.url();
        console.log(`Url: ${currentUrl}`)
    } else {
        await reservationBookingPath.click();
        console.log(`Code booking ${codeBooking} Found`);
        
        await webApp.locator(`xpath=//input[@placeholder='Kode Booking']`).fill("codeBooking");
        console.log(`Code booking ${codeBooking} Not Found`);

        await webApp.locator(`xpath=//button[normalize-space()='Cek Reservasi']`).click();
        console.log("Kode booking tidak ditemukan!");

        return;
    }
}


/**
 * Pengujian utama untuk fitur "Cek Booking"
 * 
 * Tujuan:
 * - Memastikan halaman "Cek Booking" dapat diakses
 * - Memverifikasi bahwa pengguna dapat menginput dan mengecek kode booking
 * 
 * Allure Labels:
 * - feature: check booking
 * - severity: critical
 * - platform: web
 * - status: pass
 */

// Main test
test('Reservation Check', async ({ webApp }) => {
    // Add Allure Labels for better categorization in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: check booking',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'severity: critical',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'platform: web',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'status: pass',
    });

    // Start the reservation check process
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Start to check the code booking process',
    });

    await reservationCheck(webApp, config.booking_code.ticket);
});
const { config } = require('../../config');
const { test, expect } = require('../setup');

test.setTimeout(120_000);

/**
 * Fungsi:
 * - Memilih kota keberangkatan dari dropdown "Pilih Keberangkatan"
 *
 * Alur:
 * - Klik dropdown
 * - Pilih opsi kota yang sesuai dengan parameter `departure`
 *
 * @param {object} webApp - Objek halaman dari Playwright
 * @param {string} departure - Nama kota keberangkatan
 */

// Helper function to pick departure
async function pickDeparture(webApp, departure) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick departure',
    });

    await webApp.locator(`xpath=//span[normalize-space()='Pilih Keberangkatan']`).click();
    await webApp.locator(`xpath=//div[normalize-space()='${departure}']`).click();
}

/**
 * Fungsi:
 * - Memilih kota tujuan dari dropdown "Pilih Tujuan"
 *
 * Alur:
 * - Klik dropdown
 * - Pilih opsi kota yang sesuai dengan parameter `arrival`
 *
 * @param {object} webApp - Objek halaman dari Playwright
 * @param {string} arrival - Nama kota tujuan
 */

/**
 * Fungsi untuk arrival masih tidak berfungsi dengan benar saat dilakukan test menggunakan playwright
 * saat mau pilih destinasi untuk arrival, web akan langsung tertutup/terjadi timeout
 */

// Helper function to pick arrival
async function pickArrival(webApp, arrival) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick arrival',
    });

    const labelTujuan = webApp.locator(`xpath=//span[normalize-space()='Pilih Tujuan']`);

    // Tambahkan waitForSelector dulu
    await webApp.waitForSelector(`xpath=//span[normalize-space()='Pilih Tujuan']`, { timeout: 15000 });
    await webApp.waitForTimeout(1000); // beri delay tambahan untuk rendering

    await expect(labelTujuan).toBeVisible({ timeout: 15000 });
    await labelTujuan.click();

    const dropdownOption = webApp.locator(`xpath=//div[@class='ss-content ss-open']//div[@class='ss-option'][normalize-space()='${arrival}']`);
    await webApp.waitForSelector(`xpath=//div[@class='ss-content ss-open']//div[@class='ss-option'][normalize-space()='${arrival}']`, { timeout: 15000 });
    await expect(dropdownOption).toBeVisible({ timeout: 15000 });
    await dropdownOption.click();
}

/**
 * Fungsi:
 * - Memilih jumlah penumpang dari dropdown
 *
 * Alur:
 * - Klik dropdown "Jumlah Penumpang"
 * - Klik jumlah sesuai nilai dari `totalPassenger`
 *
 * @param {object} webApp - Objek halaman dari Playwright
 * @param {number} totalPassenger - Jumlah penumpang
 */

// Helper function to select passenger
async function selectPassenger(webApp, totalPassenger) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select passenger count',
    });

    await expect(webApp.locator(`xpath=//p[normalize-space()='Penumpang']`)).toBeVisible();
    await webApp.locator(`xpath=//span[normalize-space()='1 Orang']`).click();
    await webApp.locator(`xpath=//div[normalize-space()='${totalPassenger} Orang']`).click();
}

/**
 * Fungsi:
 * - Memilih tanggal keberangkatan dari kalender
 *
 * Alur:
 * - Klik tanggal yang sesuai dengan `date` (format teks)
 * - Navigasi bulan jika diperlukan
 *
 * @param {object} webApp - Objek halaman dari Playwright
 * @param {string} date - Label tanggal (misal: "July 25, 2025")
 */

// Helper function to select date
async function selectDate(webApp, date) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel date',
    });

    await expect(webApp.locator(`xpath=//p[normalize-space()='Tanggal Pergi']`)).toBeVisible();
    await webApp.locator(`xpath=//input[@id='tanggal_pergi']`).click();

    await webApp.locator(`xpath=//span[@class='flatpickr-next-month']//*[name()='svg']`).click();
    await webApp.locator(`xpath=//span[@aria-label='${date}']`).click();

    await webApp.locator(`xpath=//button[normalize-space()='Cari']`).click()
}

/**
 * Fungsi:
 * - Memilih salah satu jadwal keberangkatan yang tersedia
 *
 * Alur:
 * - Cari tombol "Pilih"
 * - Klik tombol tersebut
 *
 * @param {object} webApp - Objek halaman dari Playwright
 */

// Helper function to select schedule
async function selectSchedule(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel schedule',
    });
    const scheduleButton = webApp.locator(`xpath=//button[normalize-space()='Pilih']`);
    await scheduleButton.click();
}

/**
 * Fungsi:
 * - Mengisi data pemesan dan penumpang
 *
 * Alur:
 * - Isi nama, email, dan no HP pemesan
 * - Jika `cust_name_same` = 1, semua penumpang disamakan dengan nama pemesan
 * - Jika tidak, isi nama tiap penumpang satu per satu
 *
 * @param {object} webApp - Objek halaman dari Playwright
 */

// Helper function to input passenger data
async function inputPassengerData(webApp) {
    const passengerData = config.passenger_data;
    const passengers = passengerData.passengers;
    const totalPassengers = passengers.length;

    test.info().annotations.push({
        type: 'allure.step',
        value: 'Input passenger details',
    });

    await webApp.locator(`xpath=//input[@id='pemesan']`).fill(passengerData.name);
    await webApp.locator(`xpath=//input[@id='email']`).fill(passengerData.email);
    await webApp.locator(`xpath=//input[@placeholder='Masukkan No. Telepon']`).fill(passengerData.phone_number);

    if (passengerData.cust_name_same != 0) {
        await webApp.locator(`xpath=//label[normalize-space()='Pemesan adalah penumpang']`).click();
    } else {
        // If not same, fill the first passenger manually
        await webApp.locator(`xpath=//input[@id='penumpang1']`).fill(passengerData.custName);
    }

    const startIndex = passengerData.cust_name_same != 0 ? 1 : 0;

    for (let i = startIndex; i < totalPassengers; i++) {
        const passenger = passengers[i];
        if (passenger?.name) {
            await webApp.locator(`xpath=//input[@id='penumpang${i + 1}']`).fill(passenger.name);
        }
    }

    await webApp.locator(`xpath=//button[@id='submit']`).click();
}

/**
 * Fungsi:
 * - Memilih kursi berdasarkan nomor yang ditentukan di `config`
 *
 * Alur:
 * - Klik tombol "Pilih" pada masing-masing kursi
 *
 * @param {object} webApp - Objek halaman dari Playwright
 */

// Helper function to select seat
async function selectSeat(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select seat',
    });

    const passengers = config.passenger_data.passengers;

    for (let i = 0; i < passengers.length; i++) {
        const passenger = passengers[i];
        
        console.log(`Select seat ${passenger.seat_number} for passenger ${passenger.name}`);

        // Seat selection
        const seatLocator = webApp.locator(`xpath=//div[@id='${passenger.seat_number}']//p`);
        await expect(seatLocator).toBeVisible({ timeout: 5000 });
        await seatLocator.click();

        await webApp.waitForTimeout(10000);
    }
    // Submit selection
    await webApp.locator(`xpath=//button[@id='submit']`).click();
}

/**
 * Fungsi:
 * - Mengisi voucher diskon jika tersedia
 *
 * Alur:
 * - Prioritas input: `freepass` → `harga` → `diskon`
 * - Jika salah satu terisi, masukkan ke input voucher
 * - Klik tombol "Gunakan"
 *
 * @param {object} webApp - Objek halaman dari Playwright
 * @param {string} voucherCode - Kode voucher yang ingin diuji
 */

// Helper function to use voucher
async function usingVoucher(webApp, voucherCode) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'use voucher',
    });

    if(voucherCode != ''){
        const buttonVoucher = webApp.locator(`xpath=//div[@id='btnListVoucher']`);
        await expect(buttonVoucher).toBeVisible({ timeout: 1000 });
        await buttonVoucher.click();
        await webApp.locator(`xpath=//input[@id='kodeVouchers']`).fill(voucherCode);
        await webApp.locator(`xpath=//button[@id='btnCekVoucher']`).click();
    } else {
        return;
    }
}

/**
 * Fungsi:
 * - Memilih metode pembayaran berdasarkan grup dan metode
 *
 * Alur:
 * - Klik bagian grup metode pembayaran (`collapse`)
 * - Pilih metode tertentu dari dalam grup tersebut
 *
 * @param {object} webApp - Objek halaman dari Playwright
 * @param {string} collapseKey - Label grup metode (contoh: "ATM,Mobile,Internet Banking")
 * @param {string} paymentMethodKey - Nama metode spesifik (contoh: "Mandiri Virtual Account")
 */

// Helper function to select payment
async function selectPayment(webApp, methodKey) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select payment method',
    });

    // Wait for section to load
    await expect(webApp.locator(`xpath=//p[normalize-space()='Pilih Metode Pembayaran']`)).toBeVisible();

    // Get the section and method label from config
    const paymentConfig = config.payment[methodKey];
    if (!paymentConfig) throw new Error(`Payment config not found for key: ${methodKey}`);

    const methodLabel = Object.values(paymentConfig).find(value => typeof value === 'string' && value !== paymentConfig.collapse);
    const sectionLabel = paymentConfig.collapse;

    if (!methodLabel || !sectionLabel) throw new Error(`Invalid method or section in config for key: ${methodKey}`);

    // Expand the correct payment section
    const sectionToggle = webApp.locator(`xpath=//p[normalize-space()='${sectionLabel}']`);
    await expect(sectionToggle).toBeVisible({ timeout: 5000 });
    await sectionToggle.click();

    // Click on the desired payment method
    const paymentMethodLocator = webApp.locator(`xpath=//p[normalize-space()='${methodLabel}']`);
    await expect(paymentMethodLocator).toBeVisible({ timeout: 5000 });
    await paymentMethodLocator.click();
}

/**
 * Fungsi:
 * - Menyetujui syarat & ketentuan lalu mengirim pemesanan
 *
 * Alur:
 * - Centang kotak persetujuan
 * - Klik tombol “Pesan Tiket”
 *
 * @param {object} webApp - Objek halaman dari Playwright
 */

// Helper function to check button syarat n ketentuan
async function checkingTnc(webApp) {
    const tncButton = webApp.locator(`xpath=//label[contains(text(),'Silahkan Tandai kotak ini sebagai bukti bahwa anda')]`);
    await tncButton.click();

    await webApp.locator(`xpath=//button[@id='submit']`).click();

    await webApp.locator(`xpath//button[@type='button'][normalize-space()='Konfirmasi']`).click();
}

// Main test
test('reservationCoba', async ({ webApp }) => {
    // Add Allure Labels for better categorization in the report
        test.info().annotations.push({
            type: 'allure.label',
            value: 'feature: Reservation',
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

        // Start the reservation process
        test.info().annotations.push({
                type: 'allure.step',
                value: 'Start reservation process',
        });

        // Pick departure
        await pickDeparture(webApp, config.journey.departure);
        console.log("✅ Departure picked");
        await webApp.waitForTimeout(10000);

        // Pick arrival
        await pickArrival(webApp, config.journey.arrival);
        await webApp.waitForTimeout(5000);

        // Select passenger and date
        await selectPassenger(webApp, config.journey.passenger_count);
        await selectDate(webApp, config.journey.date);

        // Select schedule
        await selectSchedule(webApp);

        // Input passenger details
        await inputPassengerData(webApp);

        // Select seat
        await selectSeat(webApp);

        if(config.voucher.freepass != ''){
            await usingVoucher(webApp, config.voucher.freepass)
        }
        else if(config.voucher.harga != ''){
            await usingVoucher(webApp, config.voucher.harga)
        }
        else if(config.voucher.diskon != ''){
            await usingVoucher(webApp, config.voucher.diskon)
        }

        // Select payment method
        await selectPayment(webApp, config.payment.collapse1.gopay);

        // Accept terms and submit
        await checkingTnc(webApp);
});

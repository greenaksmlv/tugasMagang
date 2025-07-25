const { config } = require('../../config');
const { test, expect } = require('../setup');
const { time } = require('console');

test.setTimeout(120_000);

/**
 * Fungsi:
 * - Memilih lokasi keberangkatan dari dropdown departure
 * 
 * Alur:
 * - Cari input "berangkat"
 * - Klik input tersebut dan pilih outlet berdasarkan nama dari parameter
 * 
 * @param {object} webApp - Objek browser Playwright 
 * @param {string} departure - Nama outlet keberangkatan
 */

// Helper function to pick departure
async function pickDeparture(webApp, departure) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick departure',
    });
    await expect(webApp.locator(`xpath=//span[normalize-space()='Pilih Keberangkatan']`)).toBeVisible();
    await webApp.locator(`xpath=//span[normalize-space()='Pilih Keberangkatan']`).click();
    await webApp.locator(`xpath=//div[normalize-space()='${departure}']`).click();
}

/**
 * Fungsi:
 * - Memilih tujuan perjalanan dari dropdown arrival
 * 
 * Alur:
 * - Cari input 'tujuan'
 * - Klik input dan pilih tujuan berdasarkan nama dari parameter
 * 
 * @param {object} webApp - Objek browser Playwright 
 * @param {string} arrival - Nama outlet tujuan 
 */

// Helper function to pick arrival
async function pickArrival(webApp, arrival) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick arrival',
    });
    await expect(webApp.locator(`xpath=//span[normalize-space()='BANDARA KERTAJATI']`)).toBeVisible();
    await webApp.locator(`xpath=//span[normalize-space()='BANDARA KERTAJATI']`).click();
    await webApp.locator(`xpath=//div[@class='ss-content ss-open']//div[@class='ss-option'][normalize-space()='${arrival}']`).click();
}

/**
 * Fungsi:
 * - Menentukan jumlah penumpang dan klik tombol cari 
 * 
 * Alur:
 * - Klik input jumlah orang
 * - Pilih jumlah dari dropdown
 * - Klik tombol "Search"
 *  
 * @param {object} webApp - Objek browser Playwright
 * @param {number} totalPassenger - Jumlah total penumpang
 */

// Helper function to select passenger count
async function selectPassenger(webApp, totalPassenger) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select passenger count',
    });
    await webApp.locator(`xpath=//span[normalize-space()='1 Orang']`).click();
    await webApp.locator(`xpath=//div[normalize-space()='${totalPassenger} Orang']`).click();
}

/**
 * Fungsi:
 * - Memilih tanggal keberangkatan dari kalender
 * 
 * Alur:
 * - Klik input tanggal keberangkatan
 * - klik tombol bulan berikutnya
 * - klik tanggal yang sesuai
 * 
 * @param {object} webApp - Objek browser Playwright 
 * @param {*} date - Tanggal dengan format
 */

// Helper function to select date
async function selectDate(webApp, date) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel date',
    });
    const dateField = webApp.locator(`xpath=//input[@id='tanggal_pergi']`);
    await expect(dateField).toBeVisible();
    await dateField.click();

    // Next month
    await webApp.locator(`xpath=//span[@class='flatpickr-next-month']//*[name()='svg']`).click();
    await webApp.locator(`xpath=//span[@aria-label='${date}']`).click();

    // button search
    await webApp.locator(`xpath=//button[@type='submit']`).click();
}

/**
 * Fungsi: 
 * - Memilih jadwal keberangkatan yang tersedia
 * 
 * Alur: 
 * - Klik tombol "Pilih Jam Keberangkatan"
 * - Klik tombol "Beli Tiket" pada jadwal yang tersedia
 * 
 * @param {object} webApp -  Objek browser Playwright
 */

// Helper function to select schedule
async function selectSchedule(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel schedule',
    });
    const scheduleButton = webApp.locator(`xpath=//li[1]//div[1]//div[1]//div[5]//button[1]`);
    await scheduleButton.click();
}

/**
 * Fungsi:
 * - Mengisi data pemesan dan penumpang yang disesuaikan dengan config.js
 * 
 * Alur: 
 * - Isi nama, email, dan nomor telepon pemesan
 * - Jika pemesan bukan penumpang, isi data penumpang pertama secara manual
 * - Isi semua data penumpang sesuai urutan
 * - Klik tombol "Pilih Kursi" lalu tombol "Lanjutkan"
 * 
 * @param {objek} webApp - Objek browser Playwright 
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

    // fill buyer details
    await webApp.locator(`xpath=//input[@id='pemesan']`).fill(passengerData.name);
    await webApp.locator(`xpath=//input[@id='email']`).fill(passengerData.email);
    await webApp.locator(`xpath=//input[@placeholder='Masukkan No. Telepon']`).fill(passengerData.phone_number);

    // Handle "Pemesan adalah penumpang" checkbox
    if (passengerData.cust_name_same != 0) {
        await webApp.locator(`xpath=//label[@for='samacheck']`).click();
    } else {
        // If not same, fill the first passenger manually
        await webApp.locator(`xpath=//input[@id='penumpang1']`).fill(passengerData.custName);
    }

    // Buyer = passenger
    const startIndex = passengerData.cust_name_same != 0 ? 1 : 0;

    for (let i = startIndex; i < totalPassengers; i++) {
        const passenger = passengers[i];
        if (passenger?.name) {
            await webApp.locator(`xpath=//input[@id='penumpang${i + 1}']`).fill(passenger.name);
        }
    }

    // click button "Pilih Kursi"
    await webApp.locator(`xpath=//button[@id='submit']`).click();
}

/**
 * Fungsi:
 * - Memilih kursi penumpang sesuai dengan nama dan nomor yang ada di config.js
 * 
 * Alur:
 * - Klik blok penumpang berdasarkan nama
 * - Klik kursi sesuai `seat_number` dari config
 * - Submit pilihan kursi
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper function to select seat
async function selectSeat(webApp) {
    const passengers = config.passenger_data.passengers;

    for (let i = 0; i < passengers.length; i++) {
        const passenger = passengers[i];

        test.info().annotations.push({
            type: 'allure.step',
            value: `Select seat ${passenger.seat_number} for ${passenger.name}`,
        });

        console.log(`Select seat ${passenger.seat_number} for ${passenger.name}`);

        // Wait for seat to be visible (this also ensures that we're on the correct passenger screen)
        const seatLocator = webApp.locator(`xpath=//div[@id='${passenger.seat_number}']//p`);
        await expect(seatLocator).toBeVisible({ timeout: 10000 });

        // Click the seat
        await seatLocator.click();

        // Wait for UI to transition to next passenger (adjust as needed)
        await webApp.waitForTimeout(3000);
    }

    // Submit all seat selections
    await webApp.locator(`xpath=//button[@id='submit']`).click();
}


/**
 * Fungsi: 
 * - Menggunakan voucher yang valid
 * 
 * Alur: 
 * - Klik tombol "Gunakan Voucher"
 * - Masukkan kode voucher dari parameter
 * - Klik tombol cek voucher
 * 
 * @param {object} webApp - Objek browser Playwright 
 * @param {string} voucherCode - Kode voucher yang akan digunakan
 */

// Helper function to use voucher
async function usingVoucher(webApp, voucherCode) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'use voucher',
    });

    if(voucherCode != ''){
        const buttonVoucher = webApp.locator(`xpath=//button[@id='btnListVoucher']`);
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
 * - Memilih metode pembayaran dari label
 * 
 * Alur: 
 * - Klik bagian "Pembayaran Instan"
 * - Klik metode pembayaran yang ingin digunakan
 * 
 * @param {object} webApp - Objek browser Playwright 
 * @param {string} paymentMethod - ALT gambar metode pembayaran/radio
 */

// Helper function to select payment method
async function selectPayment(webApp, paymentMethod) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select payment method',
    });
    await webApp.waitForSelector(`xpath=//p[normalize-space()='Pilih Metode Pembayaran']`, {time: 10000 });

    const sectionToggle = webApp.locator(`xpath=//p[normalize-space()='Pembayaran Instan']`);
    await sectionToggle.scrollIntoViewIfNeeded();
    await expect(sectionToggle).toBeVisible({ timeout: 15000 });
    await sectionToggle.click();

    const paymentRadio = webApp.locator(`xpath=//img[@alt='${paymentMethod}']`);
    await expect(paymentRadio).toBeVisible({ timeout: 10000 });
    await paymentRadio.click();
}

/**
 * Fungsi:
 * - Menyetujui syarat & ketentuan dan menyelesaikan pemesanan
 * 
 * Alur:
 * - Klik checkbox konfirmasi
 * - Klik tombol "Submit"
 * - Klik tombol "Konfirmasi" pada popup
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper function checking button syarat n ketentuan
async function checkingTnc(webApp) {
    const tncButton = webApp.locator(`xpath=//label[contains(text(),'Silahkan Tandai kotak ini sebagai bukti bahwa anda')]`);
    await tncButton.click();

    await webApp.locator(`xpath=//button[@id='submit']`).click();
}

/**
 * Pengujian utama untuk proses pemesanan tiket
 * 
 * Tujuan:
 * - Memastikan seluruh alur pemesanan dari awal sampai akhir berjalan dengan baik.
 * - Meliputi pemilihan keberangkatan, jadwal, data penumpang, kursi, voucher, hingga metode pembayaran.
 * 
 * Label Allure:
 * - feature: Reservation
 * - severity: critical
 * - platform: web
 * - status: pass
 */

// Main test
test('reservation', async ({ webApp }) => {
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

    // Pick departure and arrival
    await pickDeparture(webApp, config.journey.departure);
    await webApp.waitForTimeout(1000);
    await pickArrival(webApp, config.journey.arrival);

    // Select date and passenger count
    await selectDate(webApp, config.journey.date);
    await selectPassenger(webApp, config.journey.passenger_count);

    // Select a schedule
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
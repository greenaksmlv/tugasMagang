const { config } = require('../../config');
const { test, expect } = require('../setup');
const { time } = require('console');

test.setTimeout(120_000);

// Helper function to pick departure
async function pickDeparture(webApp, departure) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick departure',
    });

    const labelKeberangkatan = webApp.locator(`xpath=//p[normalize-space()='Keberangkatan']`);
    const dropdownKeberangkatan = webApp.locator(`xpath=//span[normalize-space()='Pilih Keberangkatan']`);
    const departureOption = webApp.locator(`xpath=//div[@class='ss-content ss-open']//div[@class='ss-option'][normalize-space()='${departure}']`);

    await expect(labelKeberangkatan).toBeVisible({ timeout: 10000 });
    await expect(dropdownKeberangkatan).toBeAttached();
    await dropdownKeberangkatan.waitFor({ state: 'visible', timeout: 10000 });
    await dropdownKeberangkatan.click();

    await expect(departureOption).toBeVisible({ timeout: 10000 });
    await departureOption.click();
}


// Helper function to pick arrival
async function pickArrival(webApp, arrival) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick arrival',
    });

    const labelTujuan = webApp.locator(`xpath=//p[normalize-space()='Tujuan']`);
    const dropdownTujuan = webApp.locator(`xpath=//span[normalize-space()='Pilih Tujuan']`);
    const arrivalOption = webApp.locator(`xpath=//div[@class='ss-content ss-open']//div[@class='ss-option'][normalize-space()='${arrival}']`);

    // Tunggu label "Tujuan" muncul
    await expect(labelTujuan).toBeVisible({ timeout: 10000 });

    // Tunggu dropdown bisa diklik
    await expect(dropdownTujuan).toBeAttached();
    await dropdownTujuan.waitFor({ state: 'visible', timeout: 10000 });
    await dropdownTujuan.click();

    // Tunggu opsi tujuan muncul
    await expect(arrivalOption).toBeVisible({ timeout: 10000 });
    await arrivalOption.click();
}


// Helper function to select passenger count
async function selectPassenger(webApp, totalPassenger) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select passenger count',
    });
    await webApp.locator(`xpath=//span[normalize-space()='1 Orang']`).click();
    await webApp.locator(`xpath=//div[normalize-space()='${totalPassenger} Orang']`).click();
}

// Helper function to select date
async function selectDate(webApp, date) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel date',
    });
    const dateField = webApp.locator(`xpath=//input[@id='tgl_berangkat']`);
    await expect(dateField).toBeVisible();
    await dateField.click();

    // Next month
    await webApp.locator(`xpath=//span[@class='flatpickr-next-month']//*[name()='svg']`).click();
    await webApp.locator(`xpath=//span[@aria-label='${date}']`).click();

    // button search
    await webApp.locator(`xpath=//button[normalize-space()='Cari']`).click();
}

// Helper function to select schedule
async function selectSchedule(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel schedule',
    });
    const scheduleButton = webApp.locator(`xpath=//button[normalize-space()='Pilih']`);
    await scheduleButton.click();
}

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

    const paymentRadio = webApp.locator(`xpath=//img[contains(@alt,'${paymentMethod}')]`);
    await expect(paymentRadio).toBeVisible({ timeout: 10000 });
    await paymentRadio.click();
}

// Helper function checking button syarat n ketentuan
async function checkingTnc(webApp) {
    const tncButton = webApp.locator(`xpath=//label[contains(text(),'Silahkan tandai kotak ini sebagai bukti bahwa anda')]`);
    await tncButton.click();

    await webApp.locator(`xpath=//button[@id='submit']`).click();

    // click Konfirmasi popup
    await webApp.locator(`xpath=//button[@type='button'][normalize-space()='Konfirmasi']`).click();
}

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
    await selectPassenger(webApp, config.journey.passenger_count);
    await selectDate(webApp, config.journey.date);
    
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
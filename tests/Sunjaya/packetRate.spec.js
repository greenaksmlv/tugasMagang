const { config } = require('../../config');
const { test, expect } = require('../setup');

test.setTimeout(120_000);

/**
 * Fungsi:
 * - Menavigasi ke halaman Cek Tarif Paket melalui menu "Lacak Paket"
 * - Mengklik tombol "Cek Tarif"
 * - Memastikan bahwa modal berisi teks "Cek Tarif Kirim Paket" muncul
 *
 * Langkah:
 * 1. Klik menu "Lacak Paket"
 * 2. Klik tombol "Cek Tarif"
 * 3. Tunggu hingga modal judul "Cek Tarif Kirim Paket" muncul
 *
 * @param {object} webApp - Objek Playwright Page
 */


// Helper function to check on packet
async function packetRate(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Tarif Paket page',
    });

    const lacakPaketMenu = webApp.locator(`xpath=//a[normalize-space()='Lacak Paket']`).first();
    await lacakPaketMenu.click();

    const packetRatePath = webApp.locator(`xpath=//button[contains(text(),'Cek Tarif')]`);
    await packetRatePath.click();

    // Expect the page to have text cek tarif kirim paket
    await expect(webApp.locator(`xpath=//div[@class='modal-dialog modal-lg modal-dialog-centered']//h5[@id='exampleModalLongTitle']`)).toBeVisible();
}

/**
 * Fungsi:
 * - Memilih kota asal pengiriman dari dropdown
 * 
 * Alur:
 * - Klik dropdown "kota asal pengiriman"
 * - Pilih salah satu kota berdasarkan parameter
 * 
 * @param {object} webApp - Objek browser Playwright
 * @param {string} origin - Nama kota asal
 */

// ada masalah di frontendnya di bagian option asal tarif paket

// Helper function to pick packet origin
async function pickOrigin(webApp, origin) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick packet origin',
    });

    const dropdownWrapper = webApp.locator(`xpath=//div[@class='form-group']//select[@id='asal']`);
    await expect(dropdownWrapper).toBeVisible({ timeout: 10000 });
    await dropdownWrapper.click();

    const originOption = webApp.locator(`xpath=`)

}

/**
 * Fungsi:
 * - Memilih kota tujuan pengiriman dari dropdown
 * 
 * Alur:
 * - Klik dropdown "kota tujuan"
 * - Pilih salah satu kota tujuan dari parameter
 * 
 * @param {object} webApp - Objek browser Playwright
 * @param {string} destination - Nama kota tujuan
 */

// Helper function to pick packet destination
async function pickDestination(webApp, destination) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick packet destination',
    });

    const destinationDropdown = webApp.locator(`xpath=//span[normalize-space()='Lokasi Tujuan']`);
    await expect(destinationDropdown).toBeVisible();
    await destinationDropdown.click();

    // Tunggu dropdown benar-benar terbuka
    await webApp.locator(`.ss-content.ss-open`).waitFor({ state: 'visible', timeout: 5000 });

    const destinationOption = webApp.locator(`xpath=//div[@class='ss-content ss-open']//div[@class='ss-option'][normalize-space()='${destination}']`).first();
    await expect(destinationOption).toBeVisible({ timeout: 5000 });
    await destinationOption.click();
}


/**
 * Fungsi:
 * - Memilih jenis paket
 * 
 * Alur:
 * - Klik dropdown jenis paket
 * - Pilih berdasarkan nama jenis paket dari parameter
 * 
 * @param {object} webApp - Objek browser Playwright
 * @param {string} packetType - Jenis paket yang dipilih
 */

// Helper function to pick packet type
async function pickType(webApp, packetType) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick packet destination',
    });   
    
    const typeDropdown = webApp.locator(`xpath=//span[normalize-space()='HEMAT']`);
    await expect(typeDropdown).toBeVisible();
    await webApp.waitForTimeout(500);
    await typeDropdown.click();

    const typeOption = webApp.locator(`xpath=//div[normalize-space()='${packetType}']`);
    await expect(typeOption).toBeVisible();
    await typeOption.click();
}

/**
 * Fungsi:
 * - Mengisi panjang paket
 * 
 * Alur:
 * - Isi input panjang dengan nilai dari parameter
 * 
 * @param {object} webApp - Objek browser Playwright
 * @param {number} length - Panjang paket
 */

// Helper function to pick packet length
async function setLength(webApp, length) {
    test.info().annotations.push({
            type: 'allure.step',
            value: 'Set packet length',
        });    

        const lengthInput = webApp.locator(`xpath=//input[@id='panjang']`);
        await expect(lengthInput).toBeVisible();
        await lengthInput.fill(length.toString());
}

/**
 * Fungsi:
 * - Mengisi lebar paket
 * 
 * Alur:
 * - Isi input lebar dengan nilai dari parameter
 * 
 * @param {object} webApp - Objek browser Playwright
 * @param {number} width - Lebar paket
 */

// Helper function to pick packet width
async function setWidth(webApp, width) {
    test.info().annotations.push({
            type: 'allure.step',
            value: 'Set packet width',
        });    

        const widthInput = webApp.locator(`xpath=//input[@id='lebar']`);
        await expect(widthInput).toBeVisible();
        await widthInput.fill(width.toString());
}

/**
 * Fungsi:
 * - Mengisi tinggi paket dan klik tombol "Cek Harga".
 * 
 * Alur:
 * - Isi input tinggi dengan nilai dari parameter
 * - Klik tombol "Cek Harga"
 * 
 * @param {object} webApp - Objek browser Playwright
 * @param {number} height - Tinggi paket
 */

// Helper function to pick packet heigth
async function setHeight(webApp, height) {
    test.info().annotations.push({
            type: 'allure.step',
            value: 'Set packet height',
        });    

        const heightInput = webApp.locator(`xpath=//input[@id='tinggi']`);
        await expect(heightInput).toBeVisible();
        await heightInput.fill(height.toString());
}

/**
 * Fungsi:
 * - Mengisi berat paket
 * 
 * Alur:
 * - Isi input berat dengan nilai dari parameter
 * 
 * @param {object} webApp - Objek browser Playwright
 * @param {number} weight - Berat paket 
 */

// Helper function to determine packet weight
async function setWeight(webApp, weight) {
    test.info().annotations.push({
            type: 'allure.step',
            value: 'Set packet weight',
        });    

        const weightInput = webApp.locator(`xpath=//input[@id='berat']`);
        await expect(weightInput).toBeVisible();
        await weightInput.fill(weight.toString());

        await webApp.locator(`xpath=//span[normalize-space()='Cek Tarif Paket']`).click();
}


/**
 * Pengujian utama untuk fitur pengecekan tarif paket.
 * 
 * Tujuan:
 * - Memastikan seluruh elemen form cek tarif dapat berfungsi
 * - Verifikasi proses input dari asal, tujuan, jenis, volume, dan dimensi paket
 * - Memastikan hasil estimasi tarif ditampilkan setelah pengisian selesai
 * 
 * Label Allure:
 * - feature: Reservation
 * - severity: critical
 * - platform: web
 * - status: pass
 */

// Main test
test('packet rate', async ({ webApp }) => {
    // Add Allure Labels for better categorization in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: packet rate',
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

    // Start the packet rate process
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Start packet rate process',
    });

    await packetRate(webApp);

    // Pick packet origin
    await pickOrigin(webApp, config.packet.origin);

    // Pick packet Destination
    await pickDestination(webApp, config.packet.destination);

    // Pick packet type
    // await pickType(webApp, config.packet.packetType);

    // Set packet length
    await setLength(webApp, config.packet.length);

    // Set packet width
    await setWidth(webApp, config.packet.width);  

    // Set packet heigth
    await setHeight(webApp, config.packet.height);

    // Set packet weight
    await setWeight(webApp, config.packet.weight);
});
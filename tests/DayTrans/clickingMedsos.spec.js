const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Fungsi:
 * - Untuk mengeklik ikon media sosial tertentu di bagian footer website
 * 
 * Alur:
 * - Ambil locator berdasarkan jenis media sosial dari konfigurasi (`config.media_sosial`)
 * - Pastikan tombol media sosial terlihat di halaman
 * - Klik tombol tersebut untuk membuka link media sosial
 * 
 * @param {object} webApp - Obejk browser Playwright 
 * @param {string} type - Jenis media sosial yang ingin diklik 
 */

// Helper function to click on medsos
async function clickMedsos(webApp, type) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: 'Clicking ${type} on website footer',
    });

    const igBtn = webApp.locator(config.media_sosial[type]);
    await expect(igBtn).toBeVisible();
    await igBtn.click();

    // const ttBtn = webApp.locator(config.media_sosial.tiktok);
    // await expect(ttBtn).toBeVisible();
    // await ttBtn.click();
}

/**
 * Pengujian utama untuk fitur klik ikon media sosial
 * 
 * Tujuan:
 * - Memastikan bahwa tombol media sosial (misalnya Instagram) muncul di halaman
 * - Memverifikasi bahwa tombol dapat diklik dan merespons dengan benar
 * 
 * Allure Labels:
 * - feature: media social
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('clicking media social', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: media soscial',
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
    
    // Start the access to click the media social
    await clickMedsos(webApp, 'instagram');
});
const { config } = require('../../config');
const { test, expect } = require('../setup');


/**
 * Fungsi:
 * - Untuk mengakses dan memverifikasi halaman Blog 
 * 
 * Alur:
 * - Klik opsi "Blog"
 * - Verifikasi bahwa judul muncul di halaman sebagai tanda halaman dimuat
 * 
 * @param {object} webApp - Objek browser Playwright 
 */

// Helper funtion to check on blog
async function blog(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Blog Page',
    });

    const blogPath = webApp.locator(`xpath=//a[@class='nav-link '][normalize-space()='Blog']`);
    await blogPath.isVisible();
    await blogPath.click();

    // Expect the page to have text berita Minaga
    await expect(webApp.locator(`xpath=//h1[normalize-space()='Promo dan Berita MSTrans']`)).toBeVisible(); 
}

/**
 * Pengujian utama untuk akses halaman Blog
 * 
 * Tujuan:
 * - Memastikan halaman Blog dapat diakses
 * - Memverifikasi elemen judul muncul sebagai indikator halaman berhasil dimuat
 * 
 * Allure Labels:
 * - feature: Access to blog
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('blog', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Access to blog',
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

    // Start to access blog
    await blog(webApp);
});

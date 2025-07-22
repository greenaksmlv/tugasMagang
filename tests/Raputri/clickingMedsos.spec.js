const { config } = require('../../config');
const { test, expect } = require('../setup');

async function clickingMedsos(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Tentang page',
    });

    const aboutPath = webApp.locator(`xpath=//a[normalize-space()='Tentang']`).first();
    await aboutPath.click();
    await expect(webApp.locator(`xpath=//img[@src='/default/raputri/images/icon/logo.png']`)).toBeVisible();

    const medsosPath = webApp.locator(`xpath=//div[@class='footer-text text-center text-lg-left']`);
    await medsosPath.click();
}

// Main test
test('clicking media social icon (Instagram)', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({ 
        type: 'allure.label', 
        value: 'feature: media social'
    });
    test.info().annotations.push({ 
        type: 'allure.label', 
        value: 'severity: normal' 
    });
    test.info().annotations.push({ 
        type: 'allure.label', 
        value: 'platform: web' 
    });
    test.info().annotations.push({ 
        type: 'allure.label', 
        value: 'status: pass' 
    });

    // Test: click the Instagram icon
    await clickingMedsos(webApp, 'instagram');
});
const { config } = require('../../config');
const { test, expect } = require('../setup');



// Helper function to Sign In
async function signIn(webApp, method) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Sign in with method: ${method}',
    });

    await webApp.locator(`xpath=//a[normalize-space()='Daftar/Masuk']`).click();
    await expect(webApp.locator(`xpath=//div[contains(text(),'Dengan Nomor Telepon')]`)).toBeVisible();

}

// Main test
test('sign in', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: sign in page',
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

    // Start the access to sign in page
    await signIn(webApp, 'phone');
});


const { config } = require('../../config');
const { test, expect } = require('../setup');

// Helper function to check on home page
async function homePage(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Home Page',
    });

    const homePagePath = webApp.getByRole('link', { name: /beranda/i });
    await expect(homePagePath).toBeVisible({ timeout: 10000 });
    await homePagePath.click();

    await Promise.all([
        webApp.waitForLoadState('load'),
        homePagePath.click(),
    ]);

    // Expect th epage to have text
    await expect(webApp.locator(`xpath=//p[@class='lg:text-`)).toBeVisible({ timeout: 10000 });
}

// Main test
test('home page', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Access to home page',
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

    // Start to access about us
    await homePage(webApp);
});

const { config }= require('../../config');
const { test, expect } = require('../setup');

// Helper function to check on Armada
async function armada(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Tentang page',
    });

    const armadaPath = webApp.locator(`xpath=//a[normalize-space()='Armada Kami']`);
    await expect(armadaPath).toBeVisible({ timeout: 5000 });
    await armadaPath.click();

    // Final assertion
    await expect(webApp.locator(`xpath=//p[@class='lg-`)).toBeVisible();

}

// Main test
test('armada', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: shuttle page',
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
    
    // Start the about Day Trans page
    await armada(webApp);
})




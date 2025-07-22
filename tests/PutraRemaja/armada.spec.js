const { config }= require('../../config');
const { test, expect } = require('../setup');

// Helper function to check on Armada
async function armada(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Tentang page',
    });

    const tentangDropdown = webApp.locator('button:has(svg path[d*="M0 3h20v2H"])');
    await expect(tentangDropdown).toBeVisible({ timeout: 10000 });
    await tentangDropdown.click();

    const armadaPath = webApp.getByRole('link', { name: /armada/i });
    await expect(armadaPath).toBeVisible({ timeout: 5000 });
    await armadaPath.click();

    // Final assertion
    await expect(webApp.locator('text=/armada/i')).toBeVisible();

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




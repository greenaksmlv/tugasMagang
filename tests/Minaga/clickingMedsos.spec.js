const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * Click a social media icon in the website footer using XPath locators.
 *
 * @param {object} webApp - Playwright's Page object
 * @param {string} type - Social media type to click: 'instagram', 'tiktok', 'facebook', 'twitter', 'youtube'
 * @throws {Error} If the specified social media type is not supported
 */

async function clickMedsos(webApp, type) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: `Clicking ${type} on website footer`,
    });

    // XPath selectors for each social media icon
    const medsosSelectors = {
        instagram: "//div[@class='footer-text text-center text-lg-left']",
    };

    const selector = medsosSelectors[type];
    if (!selector) {
        throw new Error(`No XPath selector defined for social media type: ${type}`);
    }

    const button = webApp.locator(`xpath=${selector}`);
    await expect(button).toBeVisible();
    await button.click();
}

/**
 * @test Click Instagram Icon in Footer
 *
 * This test verifies that the Instagram icon is visible in the footer and clickable.
 * 
 * Allure Labels:
 * - feature: media social
 * - severity: normal
 * - platform: web
 * - status: pass
 */

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
    await clickMedsos(webApp, 'instagram');
});
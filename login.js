const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const config = require('./config');

fs.mkdirSync(config.screenshots.successDir, { recursive: true });
fs.mkdirSync(config.screenshots.failedDir, { recursive: true });

const timestamp = () => new Date().toISOString().replace(/[:.]/g, '-');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try{
        await page.goto(config.loginUrl);

        await page.fill('#username', config.username);
        await page.fill('#password', config.password);
        await page.click('button[type="submit"]')
        
        //Untuk mengecek apakah ada error dalam login
        const flash = page.locator('#flash');
        await flash.waitFor({ timeout: 3000 });

        const flashText = (await flash.textContent()).trim();
        const currentUrl = page.url();

        const isSuccess = currentUrl === config.successUrl && flashText.includes('You logged into a secure area!');

       if (isSuccess) {
        const successPath = path.join(config.screenshots.successDir, `login_success_${timestamp()}.png`);
        await page.screenshot({ path: successPath });
        console.log(`Login Successful! Screenshot saved: ${successPath}`);
       }else {
        const failedPath = path.join(config.screenshots.failedDir, `login_failed_${timestamp()}.png`);
        await page.screenshot({ path: failedPath });
        console.error(`Login Failed! Screenshot saved: ${failedPath}`);
        console.error(`Error message: ${flashText}`);
       }

    }catch (err) {
        const errorPath = path.join(config.screenshots.failedDir, `login_error_${timestamp()}.png`);
        await page.screenshot({ path: errorPath });
        console.error('Unexpected error occured. Screenshot saved: ', errorPath);
        console.error(err);
    } finally {
        await browser.close();
    }
})();
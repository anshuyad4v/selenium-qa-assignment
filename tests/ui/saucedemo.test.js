const { Builder, By, until, Select } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('SauceDemo E2E UI Tests with Selenium', () => {
  let driver;
  const URL = 'https://www.saucedemo.com/';

  beforeAll(async () => {
    let options = new chrome.Options();
    if (process.env.HEADED !== 'true') {
      options.addArguments('--headless=new');
    }
    options.addArguments('--window-size=1920,1080');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    await driver.get(URL);
    await driver.executeScript('window.localStorage.clear();');
    await driver.executeScript('window.sessionStorage.clear();');
    await driver.manage().deleteAllCookies();
    // Hard reload back to login page to ensure completely clean state
    await driver.get(URL);
  });

  test('TC-01: Standard user can login successfully', async () => {
    const userField = await driver.wait(until.elementLocated(By.id('user-name')), 10000);
    await userField.clear();
    await userField.sendKeys('standard_user');
    
    const passField = await driver.findElement(By.id('password'));
    await passField.clear();
    await passField.sendKeys('secret_sauce');
    
    await driver.findElement(By.id('login-button')).click();
    
    await driver.wait(until.urlContains('inventory.html'), 10000);
    const title = await driver.findElement(By.className('title')).getText();
    expect(title).toBe('Products');
  });

  test('TC-02: Locked out user sees error banner', async () => {
    const userField = await driver.wait(until.elementLocated(By.id('user-name')), 10000);
    await userField.clear();
    await userField.sendKeys('locked_out_user');
    
    const passField = await driver.findElement(By.id('password'));
    await passField.clear();
    await passField.sendKeys('secret_sauce');
    
    await driver.findElement(By.id('login-button')).click();
    
    const errorEl = await driver.wait(until.elementLocated(By.css('[data-test="error"]')), 10000);
    const errorText = await errorEl.getText();
    expect(errorText).toContain('locked out');
  });

  test('TC-03: Empty credentials trigger validation', async () => {
    await driver.wait(until.elementLocated(By.id('login-button')), 10000).click();
    
    const errorEl = await driver.wait(until.elementLocated(By.css('[data-test="error"]')), 10000);
    const errorText = await errorEl.getText();
    expect(errorText).toContain('Username is required');
  });

  test('TC-04: Products sort by price low to high', async () => {
    const userField = await driver.wait(until.elementLocated(By.id('user-name')), 10000);
    await userField.clear();
    await userField.sendKeys('standard_user');
    
    const passField = await driver.findElement(By.id('password'));
    await passField.clear();
    await passField.sendKeys('secret_sauce');
    
    await driver.findElement(By.id('login-button')).click();
    await driver.wait(until.urlContains('inventory.html'), 10000);

    const sortElement = await driver.wait(until.elementLocated(By.className('product_sort_container')), 10000);
    const select = new Select(sortElement);
    await select.selectByValue('lohi');

    const priceElements = await driver.findElements(By.className('inventory_item_price'));
    const prices = [];
    for (let el of priceElements) {
      const text = await el.getText();
      prices.push(parseFloat(text.replace('$', '')));
    }

    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('TC-05: Adding item increments cart badge', async () => {
    const userField = await driver.wait(until.elementLocated(By.id('user-name')), 10000);
    await userField.clear();
    await userField.sendKeys('standard_user');
    
    const passField = await driver.findElement(By.id('password'));
    await passField.clear();
    await passField.sendKeys('secret_sauce');
    
    await driver.findElement(By.id('login-button')).click();
    await driver.wait(until.urlContains('inventory.html'), 10000);

    await driver.wait(until.elementLocated(By.id('add-to-cart-sauce-labs-backpack')), 10000).click();
    
    const badge = await driver.wait(until.elementLocated(By.className('shopping_cart_badge')), 10000);
    const badgeText = await badge.getText();
    expect(badgeText).toBe('1');
  });

  test('TC-06: Removing item removes cart badge', async () => {
    const userField = await driver.wait(until.elementLocated(By.id('user-name')), 10000);
    await userField.clear();
    await userField.sendKeys('standard_user');
    
    const passField = await driver.findElement(By.id('password'));
    await passField.clear();
    await passField.sendKeys('secret_sauce');
    
    await driver.findElement(By.id('login-button')).click();
    await driver.wait(until.urlContains('inventory.html'), 10000);

    await driver.wait(until.elementLocated(By.id('add-to-cart-sauce-labs-backpack')), 10000).click();
    await driver.wait(until.elementLocated(By.id('remove-sauce-labs-backpack')), 10000).click();
    
    const badges = await driver.findElements(By.className('shopping_cart_badge'));
    expect(badges.length).toBe(0);
  });

  test('TC-07: Checkout prevents proceeding without first name', async () => {
    const userField = await driver.wait(until.elementLocated(By.id('user-name')), 10000);
    await userField.clear();
    await userField.sendKeys('standard_user');
    
    const passField = await driver.findElement(By.id('password'));
    await passField.clear();
    await passField.sendKeys('secret_sauce');
    
    await driver.findElement(By.id('login-button')).click();
    await driver.wait(until.urlContains('inventory.html'), 10000);

    await driver.wait(until.elementLocated(By.id('add-to-cart-sauce-labs-backpack')), 10000).click();
    await driver.findElement(By.className('shopping_cart_link')).click();
    await driver.wait(until.elementLocated(By.id('checkout')), 10000).click();

    await driver.wait(until.elementLocated(By.id('last-name')), 10000).sendKeys('Yadav');
    await driver.findElement(By.id('postal-code')).sendKeys('10001');
    await driver.findElement(By.id('continue')).click();

    const errorEl = await driver.wait(until.elementLocated(By.css('[data-test="error"]')), 10000);
    const errorText = await errorEl.getText();
    expect(errorText).toContain('First Name is required');
  });

  test('TC-08: Complete E2E checkout flow successfully', async () => {
    const userField = await driver.wait(until.elementLocated(By.id('user-name')), 10000);
    await userField.clear();
    await userField.sendKeys('standard_user');
    
    const passField = await driver.findElement(By.id('password'));
    await passField.clear();
    await passField.sendKeys('secret_sauce');
    
    await driver.findElement(By.id('login-button')).click();
    await driver.wait(until.urlContains('inventory.html'), 10000);

    await driver.wait(until.elementLocated(By.id('add-to-cart-sauce-labs-backpack')), 10000).click();
    await driver.findElement(By.className('shopping_cart_link')).click();
    await driver.wait(until.elementLocated(By.id('checkout')), 10000).click();

    await driver.wait(until.elementLocated(By.id('first-name')), 10000).sendKeys('Anshu');
    await driver.findElement(By.id('last-name')).sendKeys('Yadav');
    await driver.findElement(By.id('postal-code')).sendKeys('10001');
    await driver.findElement(By.id('continue')).click();

    await driver.wait(until.elementLocated(By.className('summary_subtotal_label')), 10000);
    await driver.findElement(By.id('finish')).click();

    const completeHeader = await driver.wait(until.elementLocated(By.className('complete-header')), 10000);
    const text = await completeHeader.getText();
    expect(text).toBe('Thank you for your order!');
  });
});
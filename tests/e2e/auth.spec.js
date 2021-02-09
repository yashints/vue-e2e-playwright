const { chromium } = require('playwright');
const { expect } = require('chai');

const baseUrl = 'http://localhost:8080/';
const adminPassword = 'ADMIN_PASSWORD';
const adminUserName = 'Admin username';

const normalUserName = 'User username';
const normalUserPassword = 'USER_PASSWORD';

describe('Authenticated Vue App: ', () => {
  let browser;
  let page;  

  before(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto(baseUrl);
  });

  after(async () => {
    await page.close();
    await browser.close();
  });

  it('Clicking on login should redirect to login', async () => {
    await page.click('a.login');

    expect(page.url()).to.equal(`${baseUrl}login`);
  });

  it('An unauthenticated user should not be able to see the admin page', async () => {
    await page.goto(`${baseUrl}admin`);
    expect(page.url()).to.equal(`${baseUrl}login?returnUrl=/admin`);
  });

  it('An authenticated normal user should not be able to see the admin page', async () => {
    await page.goto(`${baseUrl}admin`);
    
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      await page.click('a.signup')      
    ]);

    popup.on('close', async () => {
      expect(page.url()).to.equal(`${baseUrl}unauthorized`);
    });

    await popup.fill('input[type="email"]', normalUserName);
    await popup.fill('input[type="password"]', normalUserPassword);
    await popup.click('button[type="submit"]');
  });
  
});

describe('An admin user should:', () => {
  let browser;
  let page; 

  before(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto(`${baseUrl}login`);
    
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      await page.click('a.signup')      
    ]);

    await popup.fill('input[type="email"]', adminUserName);
    await popup.fill('input[type="password"]', adminPassword);
    await popup.click('button[type="submit"]');

  });

  after(async () => {
    await page.close();
    await browser.close();
  });

  it('be able to see the admin page', async () => {
    await page.waitForNavigation();

    await page.goto(`${baseUrl}admin`);

    expect(page.url()).to.equal(`${baseUrl}admin`);
  });

  it('be redirected back to admin page after login', async () => {
    await page.waitForNavigation();

    await page.click('a.logout');

    await page.goto(`${baseUrl}admin`);
    
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      await page.click('a.signup')      
    ]);

    popup.on('close', async () => {
      expect(page.url()).to.equal(`${baseUrl}admin`);
    });

    await popup.fill('input[type="email"]', adminUserName);
    await popup.fill('input[type="password"]', adminPassword);
    await popup.click('button[type="submit"]');
  });

});

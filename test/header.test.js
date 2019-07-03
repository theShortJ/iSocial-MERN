const puppeteer =  require('puppeteer');

let browser, page;

beforeEach(async () => {
    jest.setTimeout(15000);

    browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
});

afterEach(async () => {
    await browser.close();
});

test('Header has the text', async () => {
    const text = await page.$eval('a', el => el.innerText);
    expect(text).toEqual('iSocial App');
});

test.only('Click login action and open login form', async () => {
    //const text = await page.click('(.navbar ul).lastChild.innerHTML'); It is not a valid selector
    await page.click('.navbar li:last-child');
    const loginURL = await page.url();
    expect(loginURL).toMatch('/login');
});

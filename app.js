const puppeteer = require("puppeteer");
const args = process.argv;
const email = args[2];
const password = args[3];
const username = args[4];

const settingsButton =
  "#app-mount > div.appAsidePanelWrapper_a3002d > div.notAppAsidePanel_a3002d > div.app_a3002d > div > div.layers__960e4.layers__160d8 > div > div > div > div.content_c48ade > div.sidebar_c48ade.theme-dark.theme-darker.images-dark > section > div.container__37e49 > div.buttons__37e49 > button:nth-child(4) > div > div > svg";
const editUsersProfileButton =
  "#account_security_tab-tab > div.accountProfileCard__1fed1 > div.background__1fed1 > div > div.field__1fed1.fieldSpacerBottom__1fed1 > div.fieldButton__1fed1 > button > div";
const displayNameInput =
  "#profile-customization-tab > div:nth-child(4) > div > div > div.sectionsContainer_def11f > div:nth-child(1) > div > div > input";
const saveButton =
  "#app-mount > div.appAsidePanelWrapper_a3002d > div.notAppAsidePanel_a3002d > div.app_a3002d > div > div.layers__960e4.layers__160d8 > div:nth-child(2) > div > div.contentRegion__23e6b > div.noticeRegion__23e6b.slider__4e371 > div > div > div.actions_fcf29c > button.button__201d5.lookFilled__201d5.colorGreen__201d5.sizeSmall__201d5.grow__201d5";

function randomDelay(min = 1000, max = 3500) {
  return new Promise((promise) =>
    setTimeout(promise, Math.floor(Math.random() * (max - min + 1)) + min),
  );
}

async function waitAndClick(page, selector) {
  await page.waitForSelector(selector);
  await randomDelay();
  await page.click(selector);
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://discord.com/login");
  console.log("Discord page is open!!");
  randomDelay();
  await page.waitForSelector("input.inputDefault__0f084");
  randomDelay();
  await page.type("input.inputDefault__0f084", email);
  randomDelay();
  await page.waitForSelector(`input[type="password"]`);
  randomDelay();
  await page.type(`input[type="password"]`, password);
  randomDelay();
  await page.click('button[type="submit"]');
  console.log("Logged in!!1");
  await waitAndClick(page, settingsButton);
  randomDelay();
  await waitAndClick(page, editUsersProfileButton);
  await page.waitForSelector(displayNameInput);
  await page.click(displayNameInput, { clickCount: 3 });
  await page.keyboard.press("Backspace");
  randomDelay();
  await page.type(displayNameInput, username);
  await waitAndClick(page, saveButton);
  console.log("Username changed successfully!! New username:", username);
  randomDelay();
  browser.close();
})();

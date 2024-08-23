const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { putText, getText, clickElement } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru/client${string}`, {
    setTimeout: 20000,
  });
});

When("user chooses date", async function () {
    await clickElement(this.page, ".page-nav > a:nth-child(5)");
 });

 When("user chooses time", async function () {
   await clickElement(
     this.page,
     ".movie-seances__time[href='#'][data-seance-id='198']"
   );
 });




When("user chooses 6 row 5 seat", async function () {
  return await clickElement(
    this.page,
    "div:nth-child(6) span:nth-child(5)"
  );
});

When("user chooses 7 row 4 seat", async function () {
  return await clickElement(this.page, "div:nth-child(7) span:nth-child(4)");
});

When("user chooses 7 row 5 seat", async function () {
  return await clickElement(this.page, "div:nth-child(7) span:nth-child(5)");
});

When("user chooses 8 row 4 seat - unavailable seat", async function () {
  return await clickElement(this.page, "div:nth-child(8) span:nth-child(4)");
});

When("user presses a booking button", async function () {
  return await clickElement(this.page, ".acceptin-button");
}); 


Then("user sees a text {string}", async function (string) {
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = "Вы выбрали билеты:";
  await expect(actual).contains(expected);
});

Then("button for booking is inactive {string}", async function (string) {
  const actual = String(
    await this.page.$eval("button", (button) => {
      return button.disabled;
    })
  );
  const expected = await string;
  expect(actual).contains(expected);
});

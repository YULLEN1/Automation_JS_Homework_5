const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { putText, getText } = require("../../lib/commands.js");

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




When("user chooses 1 row 2 seat", async function () {
  return await clickElement(
    this.page,
    "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(2)"
  );
});

When ("user presses button {string}", async function () {
    return await clickElement(this.page, ".acceptin-button");
}); 


Then("user sees a text {string}", async function (string) {
  const actual = await getText(this.page, "body main p:nth-child(9)");
  const expected = await string;
  expect(actual).contains(expected);
});


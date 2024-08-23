const { clickElement, putText, getText } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);
});

afterEach(() => {
  page.close();
});

describe("App for booking a movie tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

  test("Happy path 1: successful booking of one seat", async () => {
    await page.waitForSelector("h1");
    await clickElement(page, ".page-nav > a:nth-child(5)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='198']"
    );
    await clickElement(page, "div:nth-child(6) span:nth-child(5)");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    const expected = "Вы выбрали билеты:";
    await expect(actual).toContain(expected);
  });

  test("Happy path 2: successful booking of 2 seats", async () => {
    await page.waitForSelector("h1");
    await clickElement(page, ".page-nav > a:nth-child(5)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='198']"
    );
    await clickElement(page, "div:nth-child(7) span:nth-child(4)");
    await clickElement(page, "div:nth-child(7) span:nth-child(5)");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    const expected = "Вы выбрали билеты:";
    await expect(actual).toContain(expected);
  });

  test("Sad path: booking of a booked seat", async () => {
    await page.waitForSelector("h1");
    await clickElement(page, ".page-nav > a:nth-child(5)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='198']"
    );
    await clickElement(page, "div:nth-child(8) span:nth-child(4)");
    expect(
      String(
        await page.$eval("button", (button) => {
          return button.disabled;
        })
      )
    ).toContain("true");
  });
});

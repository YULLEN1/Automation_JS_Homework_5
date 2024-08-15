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

  test("Happy path 1", async () => {
    await page.waitForSelector("h1");
    await clickElement(page, ".page-nav__day.page-nav__day_chosen");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='198']"
    );
    pageChoose = await browser.newPage();
    await pageChoose.goto("https://qamid.tmweb.ru/client/hall.php");
    await pageChoose.waitForSelector("h2");
    await clickElement(
      pageChoose,
      "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(2)"
    );
    await clickElement(
      pageChoose,
      ".acceptin-button");
    pageBook = await browser.newPage();
    await pageBook.goto("https://qamid.tmweb.ru/client/payment.php");
    await pageBook.waitForSelector("h2");
    const actual = await getText(pageBook, "body main p:nth-child(9)");
    const expected = "Приятного просмотра!";
    await expect(actual).toContain(expected);
  });
});
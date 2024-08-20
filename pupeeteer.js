import axios from "axios";
import puppeteer from "puppeteer";
import fs from "fs";


async function Scraping() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://geekster.in");
    await page.setViewport({ width: 600, height: 800 });
    await page.waitForSelector("img");
    const srcs = await page.evaluate(() => {
      const images = document.querySelectorAll("img");
      return Array.from(images).map((img) => img.src);
    });
    fs.writeFileSync("./puppeteer.txt", srcs.join("\n"));
    await browser.close();
}

Scraping();

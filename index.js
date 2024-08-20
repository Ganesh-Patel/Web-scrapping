import * as cheerio from "cheerio";
import axios from "axios";
import fs from "fs";


async function Scraping() {
    try {
        const url = "https://geekster.in";
        const result = await axios.get(url);
        console.log(result.data);
        const $ = cheerio.load(result.data);
        const images = [];
        $("img").each((index, element) => {
            const source = $(element).attr("src")
            if (source) {
                const baseUrl = "https://geekster.in";
                const absoluteURL = new URL(source, baseUrl).href;
                images.push(absoluteURL);
            }

        });
        console.log("images length", images.length);

        fs.writeFileSync("./output.txt", images.join("\n"));
    } catch (err) {
        console.log(err);
    }
}
Scraping();
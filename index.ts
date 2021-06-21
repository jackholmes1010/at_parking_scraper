import puppeteer from "puppeteer"

const website = "https://atpark.at.govt.nz/user/parking"
const areaId = 121033

const username = "jackholmes5194@gmail.com"
const password = "wcn3^e*KypnL*%=]y8"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

;(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        waitForInitialPage: true,
    })

    const page = await browser.newPage()
    await page.goto(website)
    await page.waitForSelector("#userNameInput")

    await sleep(10000)
})()

import puppeteer from "puppeteer"
import fs from "fs"

const website = "https://atpark.at.govt.nz/user/parking"
const areaId = "121033"

const username = "jackholmes5194@gmail.com"
const password = "wcn3^e*KypnL*%=]y8"

async function getInterceptedResponseHeaders(): Promise<
    Record<string, string>[]
> {
    const browser = await puppeteer.launch({
        headless: true,
    })

    const page = await browser.newPage()
    await page.setRequestInterception(true)
    const responseHeaders: Record<string, string>[] = []

    page.on("response", (r) => {
        responseHeaders.push(r.headers())
    })

    page.on("request", (request) => {
        request.continue()
    })

    await page.goto(website)
    await page.waitForSelector("#userNameInput")

    const userNameInput = await page.$("#userNameInput")
    const passwordInput = await page.$("#passwordInput")
    const loginSubmitButton = await page.$("#submitButton")

    // Login
    await userNameInput?.type(username)
    await passwordInput?.type(password)
    await loginSubmitButton?.click()

    // Go to start parking page
    const startParkingSelector = "[routerlink='/user/parking']"
    await page.waitForSelector(startParkingSelector)
    const startParkingButton = await page.$(startParkingSelector)
    await startParkingButton?.click()

    await page.close()
    await browser.close()

    return responseHeaders
}

getInterceptedResponseHeaders()
    .then((response) => response.map((r) => r))
    .then((response) =>
        fs.writeFileSync("requests.json", JSON.stringify(response, null, 4))
    )

import { AuthorizationOptions } from "./types"
import puppeteer from "puppeteer"

export async function getAuthorizationOptions(
    username: string,
    password: string
): Promise<AuthorizationOptions> {
    const responseHeaders = await getInterceptedResponseHeaders(
        username,
        password
    )

    const header = responseHeaders.find(
        (h) => h["pz-authorisation"] !== undefined
    )

    if (!header) {
        throw new Error("Unable to find authorisation header")
    }

    const authHeaderValue = header["pz-authorisation"]

    return {
        applicationKey: "Development2013",
        applicationName: "parkingTag",
        applicationPlatform: "clientweb",
        applicationVersion: "400",
        authorization: authHeaderValue,
    }
}

async function getInterceptedResponseHeaders(
    username: string,
    password: string
): Promise<Record<string, string>[]> {
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

    await page.goto("https://atpark.at.govt.nz/user/parking")
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

const username = "jackholmes5194@gmail.com"
const password = "wcn3^e*KypnL*%=]y8"

getAuthorizationOptions(username, password).then((response) =>
    console.log(response)
)

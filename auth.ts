import { AuthorizationOptions, InterceptedResponse } from "./types"
import puppeteer from "puppeteer"
import fs from "fs"

let authorizationOptions: AuthorizationOptions | undefined = undefined

export async function getAuthorizationOptions(
    username: string,
    password: string
): Promise<AuthorizationOptions> {
    if (authorizationOptions) {
        return authorizationOptions
    }

    const responses = await getInterceptedResponseHeaders(username, password)

    const responseWithAuthorizationHeader = responses.find(
        (h) => h.headers["pz-authorisation"] !== undefined
    )

    const accessToken = responses.find(
        (r) => r.body && r.body.AccessToken !== undefined
    )?.body?.AccessToken

    if (!responseWithAuthorizationHeader) {
        throw new Error("Unable to find response with authorization header")
    }

    if (!accessToken) {
        throw new Error("Unable to find response with access token")
    }

    const authHeaderValue =
        responseWithAuthorizationHeader.headers["pz-authorisation"]

    authorizationOptions = {
        accessToken,
        applicationKey: "Development2013",
        applicationName: "parkingTag",
        applicationPlatform: "clientweb",
        applicationVersion: "400",
        authorization: authHeaderValue,
    }

    return authorizationOptions
}

async function getInterceptedResponseHeaders(
    username: string,
    password: string
): Promise<InterceptedResponse[]> {
    const browser = await puppeteer.launch({
        headless: true,
    })

    const page = await browser.newPage()
    await page.setRequestInterception(true)
    const responses: InterceptedResponse[] = []

    page.on("response", async (r) => {
        const headers = r.headers()

        try {
            const body = await r.json()
            responses.push({ headers, body })
        } catch (err) {
            responses.push({ headers })
        }
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

    return responses
}

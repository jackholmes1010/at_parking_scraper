import axios, { AxiosError } from "axios"
import { getAuthorizationOptions } from "./auth"
import {
    AuthorizationOptions,
    ErrorResponse,
    SessionsResponse,
    TicketsResponse,
    UsersResponse,
    VehiclesResponse,
} from "./types"
import * as E from "fp-ts/Either"

export async function getSessions(
    username: string,
    password: string
): Promise<SessionsResponse> {
    const auth = await getAuthorizationOptions(username, password)
    const response = await axios.post<SessionsResponse>(
        "https://atpark.at.govt.nz/api/CoreProxy/sessions",
        { AuthenticationProvider: 1, accessToken: auth.accessToken },
        { headers: getAuthHeaders(auth) }
    )

    return response.data
}

export async function getUser(
    username: string,
    password: string
): Promise<UsersResponse> {
    const auth = await getAuthorizationOptions(username, password)
    const session = await getSessions(username, password)
    const response = await axios.get<UsersResponse>(
        `https://atpark.at.govt.nz/api/CoreProxy/users/GetById/${session.UserId}`,
        { headers: getAuthHeaders(auth) }
    )

    return response.data
}

export async function getTickets(
    username: string,
    password: string
): Promise<TicketsResponse> {
    const auth = await getAuthorizationOptions(username, password)
    const response = await axios.get<TicketsResponse>(
        "https://atpark.at.govt.nz/api/PTProxy/FEAPITickets",
        {
            params: {
                withMotoristDetails: true,
                withSuburb: false,
                includeUnStoppableTickets: true,
            },
            headers: getAuthHeaders(auth),
        }
    )

    return response.data
}

export async function createTicket(
    username: string,
    password: string,
    duration: number,
    zoneId: number
): Promise<E.Either<ErrorResponse, unknown>> {
    const auth = await getAuthorizationOptions(username, password)
    const [vehicles, user] = await Promise.all([
        getVehicles(username, password),
        getUser(username, password),
    ])

    const vehicle = vehicles.VehicleList[0]
    const phoneNumber = user.MobilePhones[0]

    const payload = {
        Duration: duration,
        SmsReminder: true,
        DrivingReminder: false,
        ZoneName: zoneId,
        PhoneNumber: phoneNumber,
        VehiclePlate: vehicle.NumberPlate,
        VehicleId: vehicle.VehicleId,
        MethodOfCapture: 18,
    }

    try {
        const response = await axios.post<unknown>(
            `https://atpark.at.govt.nz/api/PTProxy/FEAPITickets?phoneNumber=${phoneNumber}`,
            payload,
            { headers: getAuthHeaders(auth) }
        )
        return E.right(response.data)
    } catch (err) {
        return E.left((err as AxiosError).response?.data as ErrorResponse)
    }
}

export async function getVehicles(
    username: string,
    password: string
): Promise<VehiclesResponse> {
    const auth = await getAuthorizationOptions(username, password)
    const response = await axios.get<VehiclesResponse>(
        "https://atpark.at.govt.nz/api/PTProxy/Vehicles",
        { headers: getAuthHeaders(auth) }
    )

    return response.data
}

function getAuthHeaders(options: AuthorizationOptions): Record<string, string> {
    return {
        "Pz-ApplicationKey": options.applicationKey,
        "Pz-ApplicationName": options.applicationName,
        "Pz-ApplicationPlatform": options.applicationPlatform,
        "Pz-ApplicationVersion": options.applicationVersion,
        "Pz-Authorisation": options.authorization,
    }
}

const username = process.env.AT_USERNAME
const password = process.env.AT_PASSWORD

if (!username || !password) {
    throw new Error("Set AT_USERNAME and AT_PASSWORD")
}

createTicket(username, password, 1, 121033)
    .then((response) => console.log(response))
    .catch((err) => console.log(err))

import axios from "axios"
import { getAuthorizationOptions } from "./auth"
import {
    AuthorizationOptions,
    SessionsResponse,
    TicketsResponse,
    UsersResponse,
    VehiclesResponse,
} from "./types"

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

const username = "jackholmes5194@gmail.com"
const password = "wcn3^e*KypnL*%=]y8"

getTickets(username, password).then((response) => console.log(response))

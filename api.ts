import axios from "axios"
import { getAuthorizationOptions } from "./auth"
import { VehiclesResponse } from "./types"

export async function getSession(username: string, password: string) {}

export async function getVehicles(
    username: string,
    password: string
): Promise<VehiclesResponse> {
    const auth = await getAuthorizationOptions(username, password)
    const response = await axios.get<VehiclesResponse>(
        "https://atpark.at.govt.nz/api/PTProxy/Vehicles",
        {
            headers: {
                "Pz-ApplicationKey": auth.applicationKey,
                "Pz-ApplicationName": auth.applicationName,
                "Pz-ApplicationPlatform": auth.applicationPlatform,
                "Pz-ApplicationVersion": auth.applicationVersion,
                "Pz-Authorisation": auth.authorization,
            },
        }
    )

    return response.data
}

// const username = "jackholmes5194@gmail.com"
// const password = "wcn3^e*KypnL*%=]y8"

// getVehicles(username, password).then((response) => console.log(response))

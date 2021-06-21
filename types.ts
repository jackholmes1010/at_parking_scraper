export interface InterceptedResponse {
    headers: Record<string, string>
    body?: any
}

export interface AuthorizationOptions {
    applicationKey: string
    applicationName: string
    applicationPlatform: string
    applicationVersion: string
    authorization: string
    accessToken: string
}

export interface VehiclesResponse {
    vehicleList: [
        {
            VehicleId: number
            NumberPlate: string
            Barcode: string
            Label: string
            VehicleStatus: string
            StateOfRegistration: string
        }
    ]
}

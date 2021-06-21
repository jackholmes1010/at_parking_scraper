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

export interface SessionsResponse {
    UserId: number
    DeviceId: null
    DeviceIndicator: null
}

export interface TicketsResponse {
    TicketList: unknown[]
    VehicleList: null
    Suburbs: null
    Balance: number
    TopUpFailureMessage: null
    SmsReminderOption: null
    DrivingReminderOption: null
    PrimaryVehicleId: null
}

export interface UsersResponse {
    UserId: number
    Status: number
    UserName: string
    RoleList: Array<{
        Name: string
        Level: number
        IsAdministrator: boolean
        IsPrivileged: boolean
    }>
    UserNameIsEMailAddress: boolean
    LockedOut: 0
    Title: null
    FirstName: string
    LastName: string
    YearOfBirth: number
    AddressLines: [hmm: string, address1: string, city: string]
    Town: null
    City: string
    County: null
    PostCode: string
    Country: string
    SecurityAnswer: null
    SecurityQuestion: null
    PasswordHint: null
    OptInMarketing: false
    EMails: string[]
    MobilePhones: string[]
    PaymentMeansList: Array<{
        Id: number
        PaymentProviderId: number
        Account: string
    }>
    CreatedByApplicationId: null
    CreatedByApplicationName: null
    ConfirmationStatus: null
    ConfirmationStatusDescription: null
    FailedPasswordCount: null
    FailedPasswordLimit: null
    ConfirmationTimeStamp: null
    LastSignInTimeStamp: null
    CreatedTimeStamp: null
    LastModifiedTimeStamp: null
    ContactDetailsVerified: true
    CRMID: string
    SubscriptionId: string
    TwoFactorEnabled: boolean
    LockoutEnd: null
}

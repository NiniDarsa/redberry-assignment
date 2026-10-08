export type TCompleteOrderData = {
    holdId: string|undefined
    fullName: string
    email: string
    mobileNumber: string
    cardNumber: string
    expiry: string
    cvv: string
}

 export type TCompleteOrderResponse = {
     message?: string
     errors?: Record<string, string[]>
     contested?: string[]
     data?: unknown
 }
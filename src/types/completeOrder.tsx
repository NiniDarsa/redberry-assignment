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
     data?: TOrder
 }
 
 //
 export type TOrder = {
    id: number
    reference: string
    status: "paid"
    totalPrice: number
    paidAt: string
    refundedAt: string | null
    cardLastFour: string
    isRefundable: boolean
    isUpcoming: boolean

    contact: {
        fullName: string
        email: string
        mobileNumber: string
    }

    session: {
        id: number
        date: string
        startsAt: string
        time: string
        timeBand: string
        price: number
        seatsLeft: number
        isSoldOut: boolean

        format: {
            id: number
            name: string
            priceUplift: number
            slug: string
        }

        hall: {
            id: number
            name: string
            venue: {
                id: number
                slug: string
                name: string
                city: string
            }
        }

        venue: {
            id: number
            slug: string
            name: string
            city: string
        }

        language: {
            id: number
            code: string
            name: string
            slug: string
        }

        movie: {
            id: number
            title: string
            slug: string
            kind: string
            posterUrl: string
            backdropUrl: string
            releaseDate: string
            runtimeMinutes: number
            fromPrice: number
            isComingSoon: boolean
            isFeatured: boolean
            isNotified: boolean

            ageRating: {
                code: string
                minAge: number
                description: string
            }
        }
    }

    tickets: {
        id: number
        seatCode: string
        price: number

        ticketType: {
            slug: string
            name: string
        }
    }[]
}
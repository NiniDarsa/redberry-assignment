export type TOrder = {
    id: number
    reference: string
    status: string
    totalPrice: number
    paidAt: string
    refundedAt: string | null
    isUpcoming: boolean
    isRefundable: boolean
    cardLastFour: string
    session: {
        id: number
        startsAt: string
        date: string
        time: string
        hall: {
            id: number
            name: string
        }
        venue: {
            id: number
            slug: string
            name: string
            city: string
        }
        format: {
            id: number
            slug: string
            name: string
            priceUplift: number
        }
        language: {
            id: number
            slug: string
            name: string
        }
        movie: {
            id: number
            slug: string
            title: string
            runtimeMinutes: number
            posterUrl: string
            backdropUrl: string
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
        ticketType: {
            slug: string
            name: string
        }
        price: number
    }[]
}

export type TOrdersResponse = {
    data: TOrder[]
}
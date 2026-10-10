export type THoldSeat = {
    seatId: number
    code: string
    ticketType: {
        slug: string
        name: string
    }
    price: number
}

export type THold = {
    holdId: string
    sessionId: number
    expiresAt: string
    secondsRemaining: number
    isLive: boolean
    seats: THoldSeat[]
    subtotal: number
}
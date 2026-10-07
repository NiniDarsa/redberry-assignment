export type TSeat = {
    id: number
    code: string
    label: string
    state: "available" | "sold" | "held" | "unavailable"
    aisleAfter: boolean
    isMine: boolean
}

export type TSeatRow = {
    label: string
    seats: TSeat[]
}

export type TSeatSection = {
    name: string
    rows: TSeatRow[]
}

export type TSeatMap = {
    sessionId: number
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
    sections: TSeatSection[]
}
export type TVenue = {
    city: string;
    id: number;
    name: string;
    slug: string;
};

export type TFormat = {
    id: number;
    slug: string;
    name: string;
    priceUplift: number;
};

export type TLanguage = {
    code: string;
    id: number;
    name: string;
    slug: string;
};

export type THall = {
    id: number;
    name: string;
    venue: TVenue;
};

export type TSession = {
    id: number;
    date: string;
    startsAt: string;
    time: string;
    timeBand: string;
    price: number;
    seatsLeft: number;
    isSoldOut: boolean;
    format: TFormat;
    language: TLanguage;
    hall: THall;
    venue: TVenue;
};

export type TVenueSessions = {
    venue: TVenue;
    sessions: TSession[];
};

export type TVenueSessionsResponse = TVenueSessions[];
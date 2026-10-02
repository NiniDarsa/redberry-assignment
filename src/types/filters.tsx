export type TSessionFilters = {
    ageRatings: TAgeRating[];
    formats: TFormat[];
    holdMinutes: number;
    languages: TLanguage[];
    maxSeatsPerOrder: number;
    sorts: TSort[];
    ticketTypes: TTicketType[];
    timeBands: TTimeBand[];
    venues: TVenue[];
};

export type TAgeRating = {
    id: number;
    slug: string;
    name: string;
};

export type TFormat = {
    id: number;
    slug: string;
    name: string;
};

export type TLanguage = {
    id: number;
    slug: string;
    name: string;
};

export type TSort = {
    id: string;
    name: string;
};

export type TTicketType = {
    id: string;
    name: string;
};

export type TTimeBand = {
    id: string;
    label: string;
};

export type TVenue = {
    id: number;
    slug: string;
    name: string;
    city: string;
    formats: TFormat[];
};
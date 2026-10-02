type MovieData = {
    ageRating: {
        code: string;
        minAge: number;
        description: string;
    };
    backdropUrl: string;
    formats: {
        id: number;
        slug: string;
        name: string;
        priceUplift: number;
    }[];
    fromPrice: number;
    genres: {
        id: number;
        slug: string;
        name: string;
    }[];
    id: number;
    isComingSoon: boolean;
    isFeatured: boolean;
    isNotified: boolean;
    kind: string;
    posterUrl: string;
    releaseDate: string;
    runtimeMinutes: number;
    slug: string;
    title: string;
};

type Session = {
    id: number;
    startsAt: string;
    date: string;
    time: string;
    timeBand: string;
    format: {
        id: number;
        slug: string;
        name: string;
        priceUplift: number;
    };
    hall: {
        id: number;
        name: string;
        venue: {
            id: number;
            slug: string;
            name: string;
            city: string;
        };
    };
    language: {
        id: number;
        slug: string;
        name: string;
    };
    movie: MovieData;
    venue: {
        id: number;
        slug: string;
        name: string;
        city: string;
    };
    price: number;
    seatsLeft: number;
    isSoldOut: boolean;
};

export type MovieSessions = {
    movie: MovieData;
    sessions: Session[];
};
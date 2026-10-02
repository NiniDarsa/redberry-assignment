export type TMovie = {
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

type TAgeRating = {
    code: string;
    minAge: number;
    description: string;
};

type TFormat = {
    id: number;
    slug: string;
    name: string;
    priceUplift: number;
};

type TGenre = {
    id: number;
    slug: string;
    name: string;
};

export type TMovieDetails = {
    ageRating: TAgeRating;
    availableDates: string[];

    backdropUrl: string;
    cast: string;
    director: string;

    formats: TFormat[];

    fromPrice: number;

    genres: TGenre[];

    id: number;
    isComingSoon: boolean;
    isFeatured: boolean;
    isNotified: boolean;

    kind: string;

    posterUrl: string;

    releaseDate: string;
    runtimeMinutes: number;

    slug: string;
    synopsis: string;
    title: string;
};
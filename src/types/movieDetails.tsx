export type TMovieDetails = {
    id: number;
    slug: string;
    title: string;
    kind: string;
    runtimeMinutes: number;
    releaseDate: string;
    synopsis: string;
    director: string;
    cast: string;
    backdropUrl: string;
    posterUrl: string;
    fromPrice: number;
    isComingSoon: boolean;
    isFeatured: boolean;
    isNotified: boolean;

    ageRating: {
        code: string;
        description: string;
        minAge: number;
    };

    availableDates: string[];

    formats: {
        id: number;
        slug: string;
        name: string;
        priceUplift: number;
    }[];

    genres: {
        id: number;
        slug: string;
        name: string;
    }[];
};
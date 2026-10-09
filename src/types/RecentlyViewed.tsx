import type { TGenre } from "./movies"

export type TRecentlyViewedMovie = {
    slug: string
    title: string
    posterUrl: string
    minutes: number
    age: number
    genres: TGenre[]
}
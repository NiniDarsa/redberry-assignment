import { useEffect, useState } from "react"

type TApiResponse<T> = {
    data: T
    meta?: unknown
}

export function useFetch<T>(url: string | null) {
    const [data, setData] = useState<TApiResponse<T> | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!url) {
            setData(null)
            setLoading(false)
            setError(null)
            return
        }

        const requestUrl = url
        const controller = new AbortController()

        async function fetchData() {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(requestUrl, {
                    signal: controller.signal,
                })

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`)
                }

                const result: TApiResponse<T> = await response.json()
                setData(result)
            } catch (err) {
                if (err instanceof Error && err.name !== "AbortError") {
                    setError(err.message)
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            }
        }

        fetchData()

        return () => {
            controller.abort()
        }
    }, [url])

    return { data, loading, error }
}
import { useEffect, useRef, useState } from "react"

const useOnClickOutside = () => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (
                ref.current &&
                !ref.current.contains(e.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        window.addEventListener("click", onClick)

        return () => {
            window.removeEventListener("click", onClick)
        }
    }, [])

    return {
        isOpen,
        setIsOpen,
        ref
    }
}

export default useOnClickOutside
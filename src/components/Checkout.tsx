import { useState } from "react"
import useAuthContext from "../hooks/useAuthContext"
import type { THold } from "../types/holdSeats"
import { CompleteOrder } from "../functions/function"
import type { TOrder } from "../types/completeOrder"

const Checkout = ({ HoldSeatsData,isConfirmed,setOrder }: { HoldSeatsData: THold | undefined ,isConfirmed:()=>void, setOrder: React.Dispatch<React.SetStateAction<TOrder | undefined>>}) => {
    const [cardNumb, setCardNumb] = useState("")
    const [expiry, setexpiry] = useState("")
    const [cvv, setcvv] = useState("")
    const [errors, setErrors] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
    })
    const [message, setMessage] = useState<string | undefined>("")
    const [loading, setLoading] = useState(false)


    const cardNumbChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setCardNumb(e.target.value)
    }

    const expiryChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setexpiry(e.target.value)
    }

    const cvvChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setcvv(e.target.value)
    }

    const { user } = useAuthContext()


    // Handle Purchase (step2 pay)
    const handlePurchase = async (e: React.FormEvent) => {
       
        e.preventDefault()
        setMessage("")
        setErrors({ cardNumber: "", expiry: "", cvv: "" })
        setLoading(true)
         

        try {
            const result = await CompleteOrder({
                holdId: HoldSeatsData?.holdId,
                fullName: user?.data.fullName || "",
                email: user?.data.email || "",
                mobileNumber: user?.data.mobileNumber || "",
                cardNumber: cardNumb,
                expiry,
                cvv,
            })



            if (result.status === 201) {

                console.log("Order completed:", result.data.data)
                setOrder(result.data.data)
               //show confirm modal
                isConfirmed()
                return
            }

            if (result.status === 422) {
                if (result.data.errors) {
                    setErrors({
                        cardNumber: result.data.errors.cardNumber?.[0] || "",
                        expiry: result.data.errors.expiry?.[0] || "",
                        cvv: result.data.errors.cvv?.[0] || "",
                    })
                } else if (result.data.message) {
                    setMessage(result.data.message)
                }

                return
            }

            if (result.status === 409) {
                setMessage(
                    `These seats were just sold: ${result.data.contested}`
                )
                return
            }

            if (result.status === 403) {
                setMessage("This hold belongs to another account")
                return
            }

            if (result.status === 401) {
                setMessage("User is not authenticated")
                return
            }

        } finally {
            setLoading(false)
        }
    }


    return (<div className="w-full h-full flex flex-col gap-5">
        <form id="checkout-form" onSubmit={handlePurchase}>
            <div className="border-b border-[#2A2C3D] pb-10 flex flex-col gap-5">


                <div className="flex flex-col">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        className="rounded-2xl bg-[#2A2C3D] py-2 px-3"
                        type="text" id="fullname" name="fullname"
                        value={user?.data.fullName || ""}
                        readOnly />
                </div>


                <div className="flex justify-between gap-2">
                    <div className="flex flex-col flex-1">
                        <label htmlFor="email">Email</label>
                        <input
                            className="rounded-2xl bg-[#2A2C3D] py-2 px-3"
                            type="email" id="email" name="email"
                            value={user?.data.email} readOnly />
                    </div>

                    <div className="flex flex-col flex-1">
                        <label htmlFor="mobile">Email</label>
                        <input
                            className="rounded-2xl bg-[#2A2C3D] py-2 px-3"
                            type="text" id="email" name="email"
                            value={user?.data.mobileNumber || ""} readOnly />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 pt-10">
                <div className="flex flex-col">
                    <label htmlFor="cardNumber">Card number</label>
                    <input
                        className="rounded-2xl bg-[#2A2C3D] py-2 px-3"
                        type="text" id="cardNumber" name="cardNumber"
                        value={cardNumb}
                        onChange={cardNumbChange}
                    />
                    {errors.cardNumber && (
                        <p className="text-red-500 text-sm">
                            {errors.cardNumber}
                        </p>
                    )}
                </div>

                <div className="flex justify-between gap-2">
                    <div className="flex flex-col flex-1">
                        <label htmlFor="expiry">Expiry</label>
                        <input
                            className="rounded-2xl bg-[#2A2C3D] py-2 px-3"
                            type="text" id="expiry" name="expiry"
                            value={expiry}
                            onChange={expiryChange}
                        />
                        {errors.expiry && (
                            <p className="text-red-500 text-sm">
                                {errors.expiry}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col flex-1">
                        <label htmlFor="cvv">CVV</label>
                        <input
                            className="rounded-2xl bg-[#2A2C3D] py-2 px-3"
                            type="text" id="cvv" name="cvv"
                            value={cvv}
                            onChange={cvvChange}
                        />
                        {errors.cvv && (
                            <p className="text-red-500 text-sm">
                                {errors.cvv}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {message && (
                <p className="text-red-500 text-sm">
                    {message}
                </p>
            )}
        </form>

    </div>)
}
export default Checkout
import { useState } from "react"
import useAuthContext from "../hooks/useAuthContext"
import type { THold } from "../types/holdSeats"
import { CompleteOrder } from "../functions/function"

const Checkout = ({HoldSeatsData}:{HoldSeatsData:THold | undefined}) => {
    const [cardNumb,setCardNumb]=useState("")
    const [expiry,setexpiry]=useState("")
    const [cvv,setcvv]=useState("")
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false)

    const cardNumbChange=(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>)=>{
        setCardNumb(e.target.value)
    }

    const expiryChange=(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>)=>{
        setexpiry(e.target.value)
    }

    const cvvChange=(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>)=>{
        setcvv(e.target.value)
    }

    const { user } = useAuthContext()


    // Handle Purchase (step2 pay)
     const handlePurchase = async (e: React.FormEvent) => {
        console.log("NINO")
         e.preventDefault()

         setErrors({})
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
                 console.log("Order completed:", result.data)
                 return
             }

             if (result.status === 422) {
                 if (result.data.errors) {
                     const apiErrors: Record<string, string> = {}

                     Object.entries(result.data.errors).forEach(
                         ([field, messages]) => {
                             apiErrors[field] = messages[0]
                         }
                     )

                     setErrors(apiErrors)
                 }

                 return
             }

             if (result.status === 409) {
                 console.log("Seat was sold:", result.data.contested)
                 return
             }

             if (result.status === 403) {
                 console.log("This hold belongs to another account")
                 return
             }

             if (result.status === 401) {
                 console.log("User is not authenticated")
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
                        type="text" id="mobile" name="mobile"
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
        </form>
         
    </div>)
}
export default Checkout
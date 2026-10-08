import type { TCompleteOrderData, TCompleteOrderResponse } from "../types/completeOrder"

//"2026-10-3"
export const getDateString = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}


export const Login = async (EmailPasswordObject: { email: string, password: string }) => {
  try {
    const response = await fetch("https://api.kinoxii.redberryinternship.ge/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(EmailPasswordObject),

    });
    const result = await response.json()
    // console.warn(result)
    if (!response.ok) {
      throw {
        status: response.status,
        ...result
      }
    }
    return result
  } catch (error) {
    throw error
  }

}

export const Signup = async (username="", email:string, password:string, confirmpassword="" ,avatar:File|null|undefined) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("password_confirmation", confirmpassword);
  if (avatar) {
    formData.append("avatar", avatar)
   }

  try {
    const response = await fetch("https://api.kinoxii.redberryinternship.ge/api/register", 
      {
      method: "POST",
      body: formData,
    });
    const result = await response.json()
    console.warn(result)
    if (!response.ok) {
      throw {
        status: response.status,
        ...result
      }
    }
    return result


  } catch (error) {
    throw error
  }
}

export const Logout = async () => {
  const token=localStorage.getItem("token")

  try {
    const response = await fetch("https://api.kinoxii.redberryinternship.ge/api/logout", {
      method:"POST",
      headers:{
        Authorization:`Bearer ${token}`,
        accept:"*/*"
      }

    });

 
    if (!response.ok) {
         const result = await response.json()
  
      throw {
        status: response.status,
        ...result
      }
    }
    return 
  } catch (error) {
    throw error
  }
}

export const GetUser = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        "https://api.kinoxii.redberryinternship.ge/api/me",
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "*/*",
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            ...result,
        };
    }
    return result;
    
};


export const GetOrders = async (
    filter?: "upcoming" | "past"
) => {
    const token = localStorage.getItem("token")

    const url = filter
        ? `https://api.kinoxii.redberryinternship.ge/api/tickets?filter=${filter}`
        : "https://api.kinoxii.redberryinternship.ge/api/tickets"

    const response = await fetch(url, {
        headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
        },
    })

    const result = await response.json()

    return {
        status: response.status,
        data: result.data,
    }
}


export const SearchMovies = async (query: string) => {
    try {
        const response = await fetch(
            `https://api.kinoxii.redberryinternship.ge/api/search?q=${encodeURIComponent(query)}`,
            {
                headers: {
                    Accept: "*/*",
                },
            }
        )

        if (!response.ok) {
            throw new Error("Failed to search movies")
        }

        const result = await response.json()

        return result.data
    } catch (error) {
        console.error("Search error:", error)
        throw error
    }
}

export const GetSeatMap = async (sessionId: number) => {
    const token = localStorage.getItem("token")

    const response = await fetch(
        `https://api.kinoxii.redberryinternship.ge/api/sessions/${sessionId}/seats`,
        {
            headers: {
                Accept: "*/*",
                ...(token
                    ? {
                          Authorization: `Bearer ${token}`,
                      }
                    : {}),
            },
        }
    )

    const result = await response.json()

    if (!response.ok) {
        throw {
            status: response.status,
            message: result.message,
        }
    }

    return result.data
}


export const HoldSeats = async (
    sessionId: number,
    seats: {
        seatId: number
        ticketType: "adult" | "student" | "child"
    }[]
) => {
    const token = localStorage.getItem("token")
    console.log(sessionId)
    
    const response = await fetch(
      
        `https://api.kinoxii.redberryinternship.ge/api/sessions/${sessionId}/holds`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
            body: JSON.stringify({
                seats,
            }),
        }
    )

     const result = await response.json().catch(() => ({}))

     console.log("HOLD STATUS:", response.status)
     console.log("HOLD RESPONSE:", result)

    if (!response.ok) {
        throw {
            status: response.status,
            ...result,
        }
    }

    return result
}

export const CompleteOrder = async (data: TCompleteOrderData) => {
    const token = localStorage.getItem("token")

    const response = await fetch(
        "https://api.kinoxii.redberryinternship.ge/api/orders",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                holdId: data.holdId,
                fullName: data.fullName,
                email: data.email,
                mobileNumber: data.mobileNumber.replace(/\s/g, ""),
                cardNumber: data.cardNumber.replace(/\s/g, ""),
                expiry: data.expiry,
                cvv: data.cvv,
            }),
        }
    )

    const result: TCompleteOrderResponse = await response.json()

    return {
        status: response.status,
        data: result,
    }
}


export const RefundOrder = async (reference: string) => {
    const token = localStorage.getItem("token")

    const response = await fetch(
        `https://api.kinoxii.redberryinternship.ge/api/orders/${reference}/refund`,
        {
            method: "POST",
            headers: {
                Accept: "*/*",
                Authorization: `Bearer ${token}`,
            },
        }
    )

    const result = await response.json()

    return {
        status: response.status,
        data: result.data,
        message: result.message,
    }
}








import { useContext } from "react"
import { SessionsContext } from "../context/SessionsContextProvider"



const useSessionsContext=()=>{
const context=useContext(SessionsContext)
 if(!context){
  throw new Error("useSessionsContext must be used within a SessionsContextProvider")
 }
 return context
}
export default useSessionsContext
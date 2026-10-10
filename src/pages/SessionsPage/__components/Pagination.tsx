import useSessionsContext from "../../../hooks/useSessionsContext"
import type { SessionsMeta } from "../../../types/session"


type TPagination={
    meta:SessionsMeta
}

const Pagination=({meta}:TPagination)=>{
 const {setPage,page}=useSessionsContext()
 console.log(page,meta.currentPage)

   
 const handleBack=(page:number)=>{
      const newPage=page-1;
      setPage(newPage)
    }

const handleForward=(page:number)=>{
      const newPage=page+1;
      setPage(newPage)
    }

    return(<div className="flex w-[50%] justify-around items-center m-auto pt-10">
                <button disabled={page=== 1} onClick={() => handleBack(page)} className="w-10 h-10 rounded-3xl bg-[#2A2C3D] text-[#A9A9A9] flex justify-center items-center cursor-pointer">
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.66498 8.66504L0.664978 4.66504L4.66498 0.665039" stroke="#A9A9A9" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </button>

                {Array.from({ length: meta?.lastPage || 0 }, (_, i: number) => {
                    return <button
                        key={i+1}
                        onClick={() => setPage(i + 1)}
                        className={`${meta?.currentPage === i + 1 ? "bg-[#EC3013] w-10 h-10 rounded-3xl flex justify-center items-center" : "bg-none"} hover:bg-[#2A2C3D] w-10 h-10 rounded-3xl flex justify-center items-center cursor-pointer`}>{i + 1}</button>
                })

                }
                <button disabled={page === meta?.lastPage} onClick={() => handleForward(page)} className="w-10 h-10 rounded-3xl bg-[#2A2C3D] text-[#A9A9A9] flex justify-center items-center cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12L10 8L6 4" stroke="#A9A9A9" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </button>
            </div>)
}
export default Pagination
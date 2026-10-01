const Navigation = () => {
    return (<div className="relative z-10 w-[100vw] flex justify-between items-center pl-15 pr-15 -mt-15 text-white">
        <div className="flex items-baseline gap-4">
            <h1 className="font-extrabold">KINO <span className="text-[#EC3013]">XII</span></h1>
            <p className="font-semibold text-[20px]">sessions</p>
        </div>

        <div className="flex justify-between items-baseline gap-3">
            <div className="relative w-[24vw]  h-full ">
                <input type="text" placeholder="search films and live events" className="bg-[#FFFFFF]/10 rounded-full w-full px-10 py-2   "></input>
                <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 "
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.21867 9.21867L12.25 12.25M10.5 6.125C10.5 8.54125 8.54125 10.5 6.125 10.5C3.70875 10.5 1.75 8.54125 1.75 6.125C1.75 3.70875 3.70875 1.75 6.125 1.75C8.54125 1.75 10.5 3.70875 10.5 6.125Z"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <div >
                <button className="font-extrabold  rounded-full bg-[#EC3013] cursor-pointer text-[12px] px-4 py-2 mr-3">Sing up</button>
                <button className="font-extrabold  rounded-full bg-white cursor-pointer text-black text-[12px] px-4 py-2">Log in </button>
            </div>
        </div>

    </div>)
}
export default Navigation
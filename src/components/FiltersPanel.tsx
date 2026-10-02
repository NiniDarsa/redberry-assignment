import { useState } from "react"
import { useFilterOptions } from "../hooks/useFilterOptions"

const FiltersPanel = () => {

    const [filterOptions] = useFilterOptions()

    const[venue,setVenue]=useState("")
    const[date, setDate]=useState("")
    const [format, setFormat]=useState("")
    const [language, setLanguage]=useState("")
    const [timeOfDay, setTimeOfDay]=useState("")

    return (<div className="flex flex-col text-white gap-4" >
        <div className="mb-2">
            <h2 className="font-extrabold">Sessions</h2>
            <p className="font-normal text-[#A9A9A9] text-[12px]">Browse showtimes across all venues</p>
        </div>

        <div className="font-semibold text-[15px] w-[320px]  bg-[#1E2031] rounded-2xl p-6 ">
            <div className="flex flex-col gap-6 justify-between ">
                <h3>Filters</h3>

                <div className="border-b border-[#2A2D3C] pb-5">
                    <h4 className="text-[#A9A9A9] pb-2">VENUE</h4>
                    <>

                        {filterOptions?.venues.map((item) => {
                            return (<label key={item.id} className="flex gap-3">

                                <input
                                    type="checkbox"
                                    className="appearance-none w-5 h-5 border border-[#A9A9A9] rounded-sm bg-transparent checked:bg-[#A9A9A9]"

                                // value={inputs.firstname}
                                // onChange={handleChange}
                                />
                                <div>
                                    <span>{item.name} .</span> <span className="text-[#A9A9A9] font-normal text-[12px]">{item.city}</span>
                                </div>
                            </label>)
                        })}
                    </>
                </div>


                <div className="border-b border-[#2A2D3C] pb-5">
                    <h4 className="text-white pb-2">DATE</h4>

                    <div className="flex overflow-auto gap-1">
                        {Array.from({ length: 7 }, (_, index) => {
                            const date = new Date();
                            date.setDate(date.getDate() + index);

                            return (
                                <label
                                    key={date.toISOString()}
                                    className="flex-shrink-0 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="date"
                                        className="peer hidden"
                                        defaultChecked={index === 0}
                                    />

                                    <div className="flex flex-col items-center rounded-xl px-4 py-2 bg-[#2A2D3C] text-white peer-checked:bg-[#A9A9A9] peer-checked:text-black">
                                        <span>
                                            {date.toLocaleDateString("en-US", {
                                                weekday: "short",
                                            })}
                                        </span>

                                        <span>{date.getDate()}</span>
                                    </div>
                                </label>
                            );
                        })}
                    </div>
                </div>



                <div className="border-b border-[#2A2D3C] pb-5">
                    <h4 className="text-[#A9A9A9] pb-2">FORMAT</h4>
                    <>

                        {filterOptions?.formats.map((item) => {
                            return (<label key={item.id} className="flex gap-3">
                                <input
                                    type="checkbox"
                                    className="appearance-none w-5 h-5 border border-[#A9A9A9] rounded-sm bg-transparent checked:bg-[#A9A9A9]"

                                // value={inputs.firstname}
                                // onChange={handleChange}
                                />
                                <div>{item.name}</div>
                            </label>)
                        })}
                    </>
                </div>

                <div className="border-b border-[#2A2D3C] pb-5">
                    <h4 className="text-[#A9A9A9] pb-2">LANGUAGE</h4>
                    <>

                        {filterOptions?.languages.map((item) => {
                            return (<label key={item.id} className="flex gap-3">
                                <input
                                    type="checkbox"
                                    className="appearance-none w-5 h-5 border border-[#A9A9A9] rounded-sm bg-transparent checked:bg-[#A9A9A9]"

                                // value={inputs.firstname}
                                // onChange={handleChange}
                                />
                                <div> {item.name}</div>
                            </label>)
                        })}
                    </>
                </div>



                <div className="border-b border-[#2A2D3C] pb-5">
                    <h4 className="text-[#A9A9A9] pb-2">TIME OF DAY</h4>
                    <>

                        {filterOptions?.timeBands.map((item) => {
                            return (<label key={item.id} className="flex gap-3">
                                <input
                                    type="checkbox"
                                    className="appearance-none w-5 h-5 border border-[#A9A9A9] rounded-sm bg-transparent checked:bg-[#A9A9A9]"
                                // value={inputs.firstname}
                                // onChange={handleChange}
                                />
                                <div>{item.id} . <span className="text-[#A9A9A9] font-normal text-[12px]">{item.label}</span></div>
                            </label>)
                        })}
                    </>
                </div>


            </div>

            <div className="text-[#A9A9A9] text-center pt-10 font-normal "><span>0</span> filters active</div>
        </div>

    </div>)
}
export default FiltersPanel
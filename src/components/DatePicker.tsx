import { getDateString } from "../functions/function";

type TDatePicker={
    datePeriod:string
    handleDateChange: (date:string)=>void
}
const DatePicker=({datePeriod,handleDateChange}:TDatePicker)=>{
    return(<> {Array.from({ length: 7 }, (_, index) => {
                                    const date = new Date();
                                    date.setDate(date.getDate() + index);
    
                                    const dateValue = getDateString(date)
    
                                    return (
                                        <label
                                            key={dateValue}
                                            className="flex-shrink-0 cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                name="date"
                                                className="peer hidden"
                                                checked={datePeriod === dateValue}
                                                onChange={() => handleDateChange(dateValue)}
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
                                })}</>)
}
export default DatePicker
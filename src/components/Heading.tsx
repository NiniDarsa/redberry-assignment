import { useNavigate } from "react-router-dom";

type Props = {
    title: string;
};

const Heading=({title}:Props)=>{
    const navigate=useNavigate()
    return(<div className="flex justify-between items-center mb-2">
            <h2 className="font-extrabold mb-5">{title}</h2>
            <button 
            onClick={() => navigate("/sessions")}
            className="text-[#EC3013] pr-15 cursor-pointer">see all</button>
        </div>)
}
export default Heading
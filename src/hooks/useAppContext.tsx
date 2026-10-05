import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";


const useAppContext = () => {

    const context = useContext(AppContext);

    if (!context) {
        throw new Error(
            "useAppContext must be used within a AppContextProvider"
        );
    }

    return context;
};

export default useAppContext;
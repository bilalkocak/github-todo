import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const AppContext = createContext();

export const ContextProvider = ({children}) => {
    let navigate = useNavigate();
    const [token, setToken] = useState(null)

    useEffect(() => {
        if(Boolean(token)) {
            navigate('/app')
        }
    }, [token])
    const value = {
        token,
        setToken
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;

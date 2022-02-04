import React, {createContext, useState} from 'react';

const AppContext = createContext();

export const ContextProvider = ({children}) => {
    const [token, setToken] = useState("Hello World")

    const value={
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

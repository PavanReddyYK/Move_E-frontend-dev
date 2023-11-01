// ---------------------!!!----------------------------
import { useContext, createContext } from 'react';

const AppContext = createContext()

const AppProvider = ({children})=>{
    return <AppContext.Provider value={"myData"}>{children}</AppContext.Provider>
}

const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export {AppContext, AppProvider, useGlobalContext}
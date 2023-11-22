'use client';
import { createContext, useReducer } from "react";
export const SearchContext = createContext();
export const SearchReducer = (state,action) => {
    switch (action.type)
    {
        case 'onChange':
            return { search: action.payload,done:false }
        case 'onKeyUp':
            return {done:true}
        default:
            return state
    }
}

export const SearchContextProvider = (props) => {
    const [state, dispatch] = useReducer(SearchReducer, { search: '',done:true })
    return <SearchContext.Provider value={{ ...state, dispatch }}>
        {props.children}
    </SearchContext.Provider>
}
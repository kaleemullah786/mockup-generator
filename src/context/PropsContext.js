'use client';
import { createContext, useReducer } from "react";
export const PropsContext = createContext();
export const PropsReducer = (state,action) => {
    switch (action.type)
    {
        case 'setProps':
            return { props: action.payload }
        default:
            return state
    }
}

export const PropsContextProvider = (props) => {
    const [state, dispatch] = useReducer(PropsReducer, { props:{}})
    return <PropsContext.Provider value={{ ...state, dispatch }}>
        {props.children}
    </PropsContext.Provider>
}
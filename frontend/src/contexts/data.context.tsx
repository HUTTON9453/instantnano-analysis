import React, { createContext, useReducer } from "react";
import { Data } from "../models/data.model";
import { DataReducer } from "./data.reducer";


const initialState = {
    data: new Array<Data>(),
    setData: (data: Data[]) => {},
    insertData: (data: Data) => {},
    updateData: (data: Data) => {}
}

export const DataContext = createContext(initialState);

export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DataReducer, initialState);

    function setData(data: Data[]) {
        dispatch({
            type: 'SET',
            payload: data
        });
    }

    function insertData(data: Data) {
        dispatch({
            type: 'INSERT',
            payload: data
        });
    }

    function updateData(data: Data) {
        dispatch({
            type: 'UPDATE',
            payload: data
        });
    }

    return (
        <DataContext.Provider value={{
            data: state.data,
            setData,
            insertData,
            updateData
        }}>
            {children}
        </DataContext.Provider>
    );
}
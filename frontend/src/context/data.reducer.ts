import { Data } from "../models/data.model";

export const DataReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                data: action.payload
            };
        case 'INSERT':
            const insertData = action.payload as Data;
            return {
                ...state,
                data: state.data.concat(insertData)
            };
        case 'UPDATE':
            const newData = action.payload as Data;
            const updatedData = state.data.map((data: Data) => {
                if (data.ka === newData.ka
                    && data.kd === newData.kd) {
                    return newData;
                }
                return data;
            });
            return {
                ...state,
                data: updatedData
            };
        default: return state;
    }
}
import React, { createContext, useReducer } from "react";
import {Setting } from "../models/setting.model";
import { SettingReducer } from "./setting.reducer";


const initialState = {
    setting: new Setting(),
    updateSetting: (setting: Setting) => {},
}

export const SettingContext = createContext(initialState);

export const SettingProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SettingReducer, initialState);

    function updateSetting(setting: Setting) {
        dispatch({
            type: 'UPDATE',
            payload: setting
        });
    }

    return (
        <SettingContext.Provider value={{
            setting: state.setting,
            updateSetting
        }}>
            {children}
        </SettingContext.Provider>
    );
}
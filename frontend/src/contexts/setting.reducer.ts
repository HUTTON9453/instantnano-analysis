
export const SettingReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE':
            return {
                ...state,
                setting: action.payload
            };
        default: return state;
    }
}
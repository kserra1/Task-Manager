const initialState = {
    cookieData: null,
};

const cookieReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COOKIE':
            return {
                ...state,
                cookieData: action.payload,
            };
        default:
            return state;
    }
}

export default cookieReducer;
import actionTypes from "../actions/actionTypes";

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null,
};

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log(" check fired fetch gender start:  ", action)
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = {...state};
            copyState.genders = action.data
            console.log(" check fired fetch gender success:  ", copyState)

            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_FAIDED:
            console.log(" check fired fetch gender failed:  ", action)

            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;

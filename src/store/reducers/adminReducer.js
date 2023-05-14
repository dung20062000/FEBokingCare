import actionTypes from "../actions/actionTypes";

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null,
};

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state}
            copyState.isLoadingGender = true
            console.log(" check fired fetch gender start:  ", action)
            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGender = false
            console.log(" check fired fetch gender success:  ", action)

            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_FAIDED:
            state.isLoadingGender = false,
            state.genders = [];
            console.log(" check fired fetch gender failed:  ", action)



            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;

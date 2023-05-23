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
    users:[],
    topDoctors: []
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //gender
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_FAILDED:
            state.isLoadingGender = false;
            state.genders = [];

            return {
                ...state,
            };

        //position
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_FAILDED:
            state.positions = [];
            return {
                ...state,
            };

        //role
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_FAILDED:
            state.roles = [];
            return {
                ...state,
            };

            
        //get all users
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USER_FAILDED:
            state.users = [];
            return {
                ...state,
            };
        
        //  get top doctor
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTOR_FAILDED:
            state.topDoctors = [];
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default adminReducer;

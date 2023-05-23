import actionTypes from "./actionTypes";
import { getAllCodeService, 
    createNewUserService, 
    getAllUsers, 
    deleteUserService, 
    editUserService,
    getTopDoctorService,
 } from "../../services/userService";
import { ToastContainer, toast } from 'react-toastify';

//gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderStart err:", e);
        }
    };
};
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILDED,
});

//position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log("fetchPositionStart err:", e);
        }
    };
};
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED,
});

//role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log("fetchRoleStart err:", e);
        }
    };
};
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED,
});


//create a new user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log('check createNewUser redux status', res)

            if (res && res.errCode === 0) {
                toast.success('create user success',
                {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    }
                )
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart()); //call fetchAllUserStart to render tableList
            } else {
                dispatch(saveUserFailded());
            }
        } catch (e) {
            dispatch(saveUserFailded());
            console.log("createNewUser err:", e);
        }
    };
};
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS

});
export const saveUserFailded = () => ({
    type: actionTypes.CREATE_USER_FAILDED

    
});


//delete a user
export const deleteNewUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('delete user success',
                {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    }
                )
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart()); //call fetchAllUserStart to render tableList
            } else {
                toast.error('delete user error')
                dispatch(deleteUserFailded());
            }
        } catch (e) {
            dispatch(deleteUserFailded());
            console.log("delete user err:", e);
        }
    };
};
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
});
export const deleteUserFailded = () => ({
    type: actionTypes.DELETE_USER_FAILDED
});

//EDIT a user
export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success('edit user success',
                {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    }
                )
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart()); //call fetchAllUserStart to render tableList
            } else {
                toast.error('edit user error')
                dispatch(editUserFailded());
            }
        } catch (e) {
            dispatch(editUserFailded());
            console.log("edit user err:", e);
        }
    };
};
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
});
export const editUserFailded = () => ({
    type: actionTypes.EDIT_USER_FAILDED
});



export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");

            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse())); //reverse() để đảo ngược mảng render ra table
            } else {
                toast.error('delete user error')
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            toast.error('delete user error')
            dispatch(fetchAllUserFailded());
            console.log("fetchAllUserFailded err:", e);
        }
    };
};
export const fetchAllUserSuccess = (data) => ({
    type: 'FETCH_ALL_USER_SUCCESS',
    users: data //chuyền đi 1 bên có key là users và giá trị là data chuyền vào (data là lấy từ api từ hàm dispatch)
});

export const fetchAllUserFailded = () => ({
    type: 'FETCH_ALL_USER_FAILDED'
});


// //top doctor
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorService("10");
            console.log('check res get top doctor', res)

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                }); //reverse() để đảo ngược mảng render ra table
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,

                });
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILDED: ',e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
            });
        }
    };
};
// export const fetchTopDoctorSuccess = (data) => ({
//     // type: 'FETCH_TOP_DOCTOR_SUCCESS',
//     // users: data //chuyền đi 1 bên có key là users và giá trị là data chuyền vào (data là lấy từ api từ hàm dispatch)
// });

// export const fetchTopDoctorFailded = () => ({
//     // type: 'FETCH_TOP_DOCTOR_FAILDED'
// });

// let res1 = await getTopDoctorService(3);
// console.log('check res1 get top doctor', res1)
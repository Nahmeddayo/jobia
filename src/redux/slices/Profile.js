import { createSlice } from "@reduxjs/toolkit"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser, updateUser } from "../../services/UserProfile";

export const initialState = {
    loading: false,
    hasErrors: false,
    userProfile: null,
}

const profileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        getProfile: state => {
            state.loading = true
        },
        getProfileSuccess: (state, { payload }) => {
            state.userProfile = payload
            state.loading = false
            state.hasErrors = false
        },
        getProfileFailure: (state, { payload }) => {
            state.loading = false
            state.hasErrors = payload
        },
    },
})

export const { getProfile, getProfileSuccess, getProfileFailure } = profileSlice.actions

export default profileSlice.reducer


export function handleGetUserProfile(id) {
    try {
        return async dispatch => {
            dispatch(getProfile())
            getUser(id).then((response) => {
                if (response?.status == 200) {
                    let data = response?.data?.data
                    dispatch(getProfileSuccess(data))
                }
                else {
                    dispatch(getProfileFailure(response.data))
                    console.log(response.data, "response.dataresponse.dataresponse.data");
                }
            }).catch((error) => {
                dispatch(getProfileFailure(error))
                console.log(error, "error");
            })
        }
    } catch (error) {
        console.log(error, "ERRR");
    }
}

export function handleEditProfile(id, params) {
    try {
        return async dispatch => {
            dispatch(getProfile())
            updateUser(id, params).then((response) => {
                if (response?.status == 200) {
                    let data = response?.data?.data
                    dispatch(getProfileSuccess(data))
                }
                else {
                    dispatch(getProfileFailure(response.data))
                    console.log(response.data, "response.dataresponse.dataresponse.data");
                }
            }).catch((error) => {
                dispatch(getProfileFailure(error))
                console.log(error, "error");
            })
        }
    } catch (error) {
        console.log(error, "ERRR");
    }
}

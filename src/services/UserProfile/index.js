import Api from "../index";
import { endPoints, requestType } from "../../constants/variables";

// Profile apis
export const getUser = (id) => {
    return Api(`${endPoints.getUser}/${id}`, null, requestType.GET)
}

export const updateUser = (id, params) => {
    return Api(`${endPoints.updateUser}/${id}`, params, requestType.PUT)
}

export const changePasswordUser = (params) => {
    return Api(`${endPoints.changePasswordUser}`, params, requestType.POST)
}
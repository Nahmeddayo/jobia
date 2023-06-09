import Api from "../index";
import { endPoints, requestType } from "../../constants/variables";


//Jobs apis

export const getJobs = () => {
    return Api(`${endPoints.getAllJobs}`, null, requestType.GET)
}

export const addFavouriteJob = (params) => {
    return Api(`${endPoints.addFavourite}`, params, requestType.POST)
}

export const removeFavouriteJob = (params) => {
    return Api(`${endPoints.removeFavourite}`, params, requestType.DELETE)
}

export const getFavouriteJobsById = (id) => {
    return Api(`${endPoints.getFavouriteById}/${id}`, null, requestType.GET)
}

export const applyJob = (params) => {
    return Api(`${endPoints.applyJob}`, params, requestType.POST)
}

export const getAppliedJobsById = (params) => {
    return Api(`${endPoints.getAppliedJobs}`, params, requestType.POST)
}

export const getJobByType = (type) => {
    return Api(`${endPoints.getJobByType}?jobType=${type}`, null, requestType.GET)
}
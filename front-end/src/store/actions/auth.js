import { apiRequest, setTokenHeader } from "../../utils/reqTool.js";
import {SET_CURRENT_USER} from "../constActionTypes";
import { addError,removeError } from "./errors";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user,
    }
}

export function setAuthorizationToken(token){
    setTokenHeader(token);
}

export function logout(){
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function authUser(type,userData){
    return dispatch => {
        return new Promise((resolve,reject) => {
            return apiRequest("post",`/api/user/${type}`, userData)
            .then(({token, ...user}) => {
                localStorage.setItem("jwtToken", token);
                setAuthorizationToken(token);
                dispatch(setCurrentUser(user));
                dispatch(removeError());
                resolve();
            })
            .catch(err => {
                dispatch(addError(err.message));
                reject(); // indicate the API call failed
              });
        })
    }
}
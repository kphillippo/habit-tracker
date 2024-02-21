import { SET_CURRENT_USER } from "../constActionTypes.js";

const DEFAULT_STATE = {
    isAuthenticated: false,//would change to true when user logged in
    //all the user info when logged in
    user:{}
};

export default (state=DEFAULT_STATE,action) => {
    switch(action.type){
        case SET_CURRENT_USER:
        return {
            //turn empty object into false or if there are keys, true
            isAuthenticated: !!Object.keys(action.user).length > 0,
            user:action.user,
        };
        default:
            return state;
    }
}
import axios from "axios";

//base url of API
const BASE_URL = 'http://localhost:8081/api/'

var DEFAULT_GET_HEADS = {
  'content-type': 'application/json'
}

var DEFAULT_POST_JSON_HEADS = {
  accept: 'application/json',
  'content-type': 'application/json'
}


export function setTokenHeader(token){
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

//example use case of apiRequest:
// apiRequest("POST", "user/login", data)
//             .then(({token, ...user}) => {
//                 handle the response
//             })
//             .catch(err => {
//                 handle the error
//             })
export function apiRequest(method,path,data){
    path = BASE_URL + path
    return new Promise((resolve,reject) => {
        return axios[method.toLowerCase()](path,data)
        .then(res => {
            return resolve(res.data)
        }).catch(err => {
            let errorMessage;
            if (err.response) {
                // Extract the message from the response
                errorMessage = err.response.data.message || err.response.statusText;
            } else {
                // Use the message from the error object
                errorMessage = err.message;
            }
            reject(new Error(errorMessage));
        })
    })
}
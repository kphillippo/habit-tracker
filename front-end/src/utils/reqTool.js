import axios from "axios";
//base url of API
const BASE_URL = 'http://localhost:8081/'

export function setTokenHeader(token){
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export function apiRequest(method,path,data){
    path = BASE_URL+path;
    return new Promise((resolve,reject) => {
        return axios[method.toLowerCase()](path,data)
        .then(res => {
            return resolve(res.data)
        }).catch(err => {
            return reject(err.response.data.error);
        })
    })
}
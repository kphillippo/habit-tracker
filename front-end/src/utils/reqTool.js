//base url of API
const BASE_URL = 'http://localhost:8081/'

var DEFAULT_GET_HEADS = {
  'content-type': 'application/json'
}

var DEFAULT_POST_JSON_HEADS = {
  accept: 'application/json',
  'content-type': 'application/json'
}

//GET call
function getRequest(path, queryParams = {}, heads = {}) {
    let headers = Object.assign(DEFAULT_GET_HEADS, heads);
    let queryString = new URLSearchParams(queryParams).toString();
    let url = BASE_URL + path;

    return fetch(url, {
        method: 'GET',
        headers: headers
    })
    .then(response => {
        // console.log("GET call");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        // console.log(data);
        return data; 
    })
    .catch(error => {
        console.error('Error during GET request:', error);
        throw error; 
    });
}

//POST call with json as input data format
function postRequestJson(path, data, heads = {}) {
    let headers = Object.assign(DEFAULT_GET_HEADS, heads);
    let url = BASE_URL + path;
    let promise = new Promise((res, req) => {
        fetch(url, {
            method: 'POST',
            headers: headers,
            data: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error during GET request:', error);
        });
    })
    return promise;
}

//POST call with parameters as input data format
function postRequestParam(path, data, heads = {}) {
    let headers = Object.assign(DEFAULT_GET_HEADS, heads);
    let url = BASE_URL + path;
    // console.log(data)
    let param = getParam(data)
    // console.log(param)
    let promise = new Promise((res, req) => {
        fetch(url, {
            method: 'POST',
            headers: headers,
            data: param
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error during GET request:', error);
        });
    })
    return promise;
}


//convert data into URL query
//example: data = { name: 'John', age: 30 };
//         getParam(data) = "name=John&age=30"
function getParam(data) {
    let param = ''
    if (data) {
      let keys = Object.keys(data)
      let kv = []
      keys.forEach(value => {
        kv.push(value + '=' + data[value])
      })
      if (kv.length > 0) {
        param = kv.join('&')
      }
      return param
    } else {
      return param
    }
  }


const Request = {
    getRequest,
    postRequestJson,
    postRequestParam,
}
export default Request
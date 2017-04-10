import QueryString from "querystring";
import Axios from "axios";
import Utils from "../helper/Utils";

export function getRequest(param) {
    return Axios.get('https://jetspree-node-test.herokuapp.com/requests?' + QueryString.stringify(param))
        .then((response) => response.data)
        .catch(function (error) {
            console.log(error);
        });
}

export function getRequests(param) {
    return Axios.get('https://jetspree-node-test.herokuapp.com/requests?' + QueryString.stringify(param))
        .then((response) => response.data)
        .catch(function (error) {
            console.log(error);
        });
}

export function postRequests(param) {
    return Axios.post('https://jetspree-node-test.herokuapp.com/auth/requests', param,
        {headers: {'x-access-token': Utils.getCookie('token')}})
        .then((response) => response.data)
        .catch(function (error) {
            console.log(error);
        });
}

export function loadItems(param) {
    return Axios({
        method: 'GET', url: 'https://www.jetspree.com/api/items?' + QueryString.stringify(param),
        crossDomain: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => response.data)
        .catch((error) => {
        });
}
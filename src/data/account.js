import Axios from "axios";

export function postSignup(data) {
    return Axios.post(process.env.REACT_APP_JETSPREE_API_URL + '/login/signup', data)
        .then((req) => req)
        .catch(function (error) {
            console.log(error);
        });
}

export function postLogin(data) {
    return Axios.post(process.env.REACT_APP_JETSPREE_API_URL + '/login/account', data)
}

export function getAuthUser(token) {
    return Axios.get(process.env.REACT_APP_JETSPREE_API_URL + '/auth/user?token=' + token)
        .then((response) => response.data)
        .catch(function (error) {
            console.log(error);
        });
}
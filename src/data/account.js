import Axios from "axios";

export function postSignup(data) {
    return Axios.post('https://jetspree-node-test.herokuapp.com/login/signup', data)
        .then((req) => req)
        .catch(function (error) {
            console.log(error);
        });
}

export function postLogin(data) {
    return Axios.post('https://jetspree-node-test.herokuapp.com/login/account', data)
}

export function getAuthUser(token) {
    return Axios.get('https://jetspree-node-test.herokuapp.com/auth/user?token=' + token)
        .then((response) => response.data)
        .catch(function (error) {
            console.log(error);
        });
}
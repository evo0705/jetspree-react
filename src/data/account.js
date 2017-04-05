import Axios from "axios";

export function postSignup(data) {
    alert(data);
	return Axios.post('https://jetspree-node-test.herokuapp.com/login/signup', {email:data.email, password: data.password})
		.then( (req) => req )
		.catch(function (error) {
			console.log(error);
		});
}

export function postLogin(data) {
    return Axios.post('https://jetspree-node-test.herokuapp.com/login/account', {email: data.email, password: data.password})
}


export function getAuthUser(token) {
    return Axios.get('https://jetspree-node-test.herokuapp.com/auth/user?token=' + token)
		.then( (response) => response.data )
		.catch(function (error) {
			console.log(error);
		});
}
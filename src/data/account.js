import QueryString from 'querystring';
import Axios from "axios";

export function postSignup(data) {
	alert(data)
	return Axios.post('https://jetspree-node-test.herokuapp.com/login/signup', {email:data.email, password: data.password})
		.then( (req) => req )
		.catch(function (error) {
			console.log(error);
		});
}


export function getAuthUser(param) {
	return Axios.get('https://jetspree-node-test.herokuapp.com/auth/user?' + QueryString.stringify(param))
		.then( (response) => response.data )
		.catch(function (error) {
			console.log(error);
		});
}
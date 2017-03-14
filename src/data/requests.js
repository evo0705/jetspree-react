import QueryString from 'querystring';
import Axios from 'axios';

export function loadRequests(param) {

	let api = 'https://jetspree-node-test.herokuapp.com/requests?' + QueryString.stringify(param);

	return Axios.get(api)
		.then( (response) => response.data )
		.catch(function (error) {
			console.log(error);
		});
}
import QueryString from 'querystring';
import Axios from 'axios';

export function loadRequests(param) {
	return Axios.get('https://jetspree02.cloudapp.net//api/trips?' + QueryString.stringify(param))
		.then( (response) => response.data )
		.catch(function (error) {
			console.log(error);
		});
}
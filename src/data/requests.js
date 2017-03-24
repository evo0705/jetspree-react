import QueryString from 'querystring';
import Axios from 'axios';

export function loadRequest(param) {
	return Axios.get('https://www.jetspree.com/api/items/' + param.id + '?' + QueryString.stringify(param))
		.then( (response) => response.data )
		.catch(function (error) {
			console.log(error);
		});
}

export function loadRequests(param) {
	return Axios.get('https://jetspree-node-test.herokuapp.com/requests?' + QueryString.stringify(param))
		.then( (response) => response.data )
		.catch(function (error) {
			console.log(error);
		});
}

export function loadItems(param) {
	return Axios({ method: 'GET', url:'https://www.jetspree.com/api/items?' + QueryString.stringify(param), 
	crossDomain: true,
		headers: {
    		'Accept': 'application/json',
    		'Content-Type': 'application/json'
  		}
    }) 
	.then( (response) => response.data )
	.catch((error) => {  });
}
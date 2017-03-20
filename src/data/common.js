import QueryString from 'querystring';
import Axios from "axios";

export function loadCountries() {
	return Axios.get('https://jetspree-node-test.herokuapp.com/countries')
		.then( (response) => response.data )
		.catch(function (error) {
			console.log(error);
		});
}

export function loadSubCategories() {
	return Axios.get('https://jetspree-node-test.herokuapp.com/categories/sub')
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


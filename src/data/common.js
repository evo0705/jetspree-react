import Axios from "axios";

export function loadCountries() {
	return Axios.get('https://jetspree-node-test.herokuapp.com/api/countries')
		.then( (response) => response.data )
		.catch(function (error) {
			console.log(error);
		});
}

export function loadSubCategories() {
	return Axios.get('https://jetspree-node-test.herokuapp.com/api/categories/sub')
		.then( (response) => response.data )
		.catch(function (error) {
			console.log(error);
		});
}
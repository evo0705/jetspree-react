import Axios from "axios";

export function loadCountries() {
    return Axios.get(process.env.REACT_APP_JETSPREE_API_URL + '/countries')
		.then( (response) => response.data )
		.catch(function (error) {
			console.log(error);
		});
}

export function loadSubCategories() {
    return Axios.get(process.env.REACT_APP_JETSPREE_API_URL + '/categories/sub')
		.then( (response) => response.data )
		.catch(function (error) {
			console.log(error);
		});
}
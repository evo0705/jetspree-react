import QueryString from 'querystring';
import Axios from 'axios';

export function loadTrips(param) {
	return Axios.get('https://www.jetspree.com/api/trips?' + QueryString.stringify(param))
		.then( (response) => response.data )
		.catch(function (error) {
			console.log("error: " + error);
		});
}

export function loadRecommendations(param) {
	return Axios.get('https://www.jetspree.com/api/recommendations?' + QueryString.stringify(param))
		.then( (response) => response.data )
		.catch(function (error) {
			console.log("error: " + error);
		});
}

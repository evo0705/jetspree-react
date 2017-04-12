import QueryString from 'querystring';
import Axios from 'axios';

export function getTrips(param) {
    return Axios.get(process.env.REACT_APP_JETSPREE_API_URL + '/trips?' + QueryString.stringify(param))
        .then( (response) => response.data )
        .catch(function (error) {
            console.log("error: " + error);
        });
}

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
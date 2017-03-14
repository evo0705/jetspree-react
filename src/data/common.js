export function loadCountries() {
	return fetch("https://jetspree-node-test.herokuapp.com/api/countries")
      .then( (response) => response.json() );
}

export function loadSubCategories() {
	return fetch("https://jetspree-node-test.herokuapp.com/api/categories/sub")
      .then( (response) => response.json() );
}
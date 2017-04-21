
// All hardcoded data

export function loadCountries() {
	return [
		{
			id: 1,
			code: 'my',
			name: 'malaysia'
		},
		{
			id: 2,
			code: 'hk',
			name: 'hong kong'
		},
		{
			id: 3,
			code: 'sg',
			name: 'singapore'
		}
	]
}

export function loadCurrencies() {
	return [
		{
			id: 1,
			code: 'myr',
			name: 'Malaysian Ringgit'
		},
		{
			id: 2,
			code: 'usd',
			name: 'US Dollar'
		},
		{
			id: 3,
			code: 'hkd',
			name: 'Hong Kong Dollar'
		}
	]
}

export function loadCities() {
	return	[
		{
			id: 1,
			name: 'selangor',
			state: [
				{
					name: 'gombak',
				},
				{
					name: 'hulu langat',
				},
				{
					name: 'hulu selangor',
				}
			]
		},
		{
			id: 2,
			name: 'sarawak',
			state: [
				{
					name: 'Bintulu',
				},
				{
					name: 'Kapit',
				},
				{
					name: 'Kuching',
				}
			]
		}
	]
}

export function loadStates() {
	return [
		{
			id: 1,
			name: 'gombak',
			cityid: 1
		},
		{
			id: 2,
			name: 'hulu langat',
			cityid: 1
		},
		{
			id: 3,
			name: 'hulu selangor',
			cityid: 1
		},
		{
			id: 4,
			name: 'Bintulu',
			cityid: 2
		},
		{
			id: 5,
			name: 'Kapit',
			cityid: 2
		},
		{
			id: 6,
			name: 'Kuching',
			cityid: 2
		}
	]
}
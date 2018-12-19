const config = require('../config');
const moment = require('moment');

const generateMessage = (from, text) => ({
    from,
    text,
    createdAt: moment().valueOf()
})

const generateLocationMessage = (from, coords) => ({
	from,
	url: getPreparedGoogleMapUrl(coords),
	createdAt: moment().valueOf()
})

const getPreparedGoogleMapUrl = coords => {
	const googleMapUrl = config.paths.googleMaps
		.replace('{latitude}', coords.latitude)
		.replace('{longitude}', coords.longitude)
	return googleMapUrl;
}

module.exports = {
	generateMessage,
	generateLocationMessage,
	getPreparedGoogleMapUrl
}
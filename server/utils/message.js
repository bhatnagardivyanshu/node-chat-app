const config = require('../config');

const generateMessage = (from, text) => ({
    from,
    text,
    createdAt: new Date().toDateString()
})

const generateLocationMessage = (from, coords) => ({
	from,
	url: getPreparedGoogleMapUrl(coords),
	createAt: new Date().toDateString
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
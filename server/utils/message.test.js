const expect = require('expect');
const {
	generateMessage, 
	generateLocationMessage,
	getPreparedGoogleMapUrl,
} = require('./message');

describe('testing using jest', () => {
	test('adds 2 numbers', () => {
		const a = (function(a, b){return a+b}(2,4));
		expect(a).toBe(6)
	})
})

describe('message.js', () => {

	test('should generate correct message object', () => {
		const	from = 'sample user',
				text = 'sample text';
				messageObj = generateMessage(from, text);

		expect(messageObj).toMatchObject({from,text});
		expect(messageObj.createdAt).toBeTruthy()
			
	})
});

describe('generateLocationMessage', () => {
	test('should generate correct location object', () => {
		const	coords = { latitude: 28.625810, longitude: 77.110580 },
				messageObj = generateLocationMessage('Admin', coords);

		expect(messageObj).toMatchObject({
			from: 'Admin',
			url: getPreparedGoogleMapUrl(coords),
		})
	})
})
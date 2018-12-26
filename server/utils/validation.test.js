const expect = require('expect');
const {isRealString} = require('../utils/validation');

describe('isRealString', () => {

	it('should reject non-string values', () => {
		const result = isRealString(100);
		expect(result).toBeFalsy();
	});

	it('should reject string with only spaces', () => {
		const result = isRealString('   ');
		expect(result).toBeFalsy();
	})
	
	it('should allow string with non-space-characters', () => {
		const result = isRealString('some-random-string');
		expect(result).toBeTruthy();
	})
	
})
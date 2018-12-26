const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

	let users = null;

	beforeEach(() => {
		users = new Users();
		users.users = [
			{id: 1, name: 'Aman', room: 'Class A'},
			{id: 2, name: 'Chirag', room: 'Class B'},
			{id: 3, name: 'Daksh', room: 'Class C'}
		]
	})
	
	it('should add new user', () => {
		let users = new Users();
		const usersCount = users.users.length;
		const user = {
			id: 'random-id',
			name: 'Divyanshu',
			room: 'test'
		}
		const newUser = users.addUser(user.id, user.name, user.room);
		expect(newUser).toMatchObject(user);
		expect(users.users.length).toBe(usersCount + 1);
	})

	it('should return the list of names in the room', () => {
		users = users.getUsersList('Class A');
		expect(users.length).toBe(1);
		// expect(users[0]).toBe('Aman')
		expect(users).toContain('Aman')
		// expect(users).toEqual(expect.arrayContaining(['Aman']))
	})

	it('should find a user', () => {
		const user = users.getUser(2);
		expect(user).toMatchObject(users.users[1]);
		expect(user).toBeTruthy();
	});

	it('should not return a user', () => {
		const user = users.getUser(4);
		expect(user).toBeFalsy();
	})

	it('should remove a user', () => {
		const user = users.removeUser(2);
		expect(user.id).toBe(2);
		expect(users.users.length).toBe(2);
	})
	
	it('should not remove a user', () => {
		const user = users.removeUser(4);
		expect(user).toBeFalsy();
		expect(users.users.length).toBe(3);
	})
	
})
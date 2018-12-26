class Users {
	constructor() {
		this.users = [];
	}

	addUser(id, name, room) {
		const user = {id, name, room};
		this.users.push(user);
		return user;
	}

	getUser(id) {
		return this.users.filter(user => user.id === id)[0];
	}

	removeUser(id) {
		const user = this.getUser(id);
		console.log('Removing user', user);
		if(user) {
			this.users = this.users.filter(user => user.id !== id);
		}
		return user;
	}

	getUsersList(room) {
		// return this.users.filter(user => user.room === room);
		return this.users.reduce((namesArr, user) => {
			if (user.room === room) {
				namesArr.push(user.name)
			}
			return namesArr;
		}, []);
	}
	
}

module.exports = {Users}
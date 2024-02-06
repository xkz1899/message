module.exports = class UserDto {
	id
	login
	lastSeen
	avatar
	role
	constructor(model) {
		this.id = model.id
		this.login = model.login
		this.lastSeen = model.lastSeen
		this.avatar = model.avatar
		this.role = model.role
	}
}

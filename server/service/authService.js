const ApiError = require("../errors/ApiError")
const bcrypt = require("bcrypt")
const dtoUser = require("../dto/userDto")
const tokenService = require("./tokenService")
const { User, Role } = require("../models/models")

class AuthService {
	async tokenHandler(user) {
		const userDto = await new dtoUser(user)
		const tokens = tokenService.generateToken({ ...userDto })
		await tokenService.saveToken(tokens.refreshToken, userDto.id)
		return { ...tokens, user: userDto }
	}

	async registration(login, password) {
		const candidate = await User.findOne({ where: { login } })
		if (candidate) {
			throw ApiError.BadRequest(
				`Пользователь ${login} существует в базе данных.`
			)
		}
		const hashPassword = bcrypt.hashSync(password, 5)
		const user = await User.create({ login, password: hashPassword })
		const roles = await Role.create({ userId: user.id })
		return this.tokenHandler({ ...user.dataValues, role: [roles.role] })
	}

	async login(login, password) {
		const user = await User.findOne({ where: { login } })
		if (!user) throw ApiError.BadRequest(`Пользователь не найден.`)
		
		const comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) throw ApiError.BadRequest(`Неверный пароль.`)
		const roles = await Role.findAll({ where: { userId: user.id } })
		const rolesDeployment = []
		roles.forEach(role => rolesDeployment.push(role.role))

		return this.tokenHandler({ ...user.dataValues, role: rolesDeployment })
	}

	async logout(refreshToken) {
		await tokenService.removeToken(refreshToken)
	}

	async refresh(refreshToken) {
		if (!refreshToken) throw ApiError.Unauthorized()

		const dbToken = await tokenService.findToken(refreshToken)
		const userData = await tokenService.verifyRefreshToken(refreshToken)
		if (!dbToken && !userData) throw ARpiError.Unauthorized()

		const user = await User.findOne({ where: { id: userData.id } })
		const roles = await Role.findAll({ where: { userId: user.id } })
		const rolesDeployment = []
		roles.forEach(role => rolesDeployment.push(role.role))

		return this.tokenHandler({ ...user.dataValues, role: rolesDeployment })
	}
}

module.exports = new AuthService()

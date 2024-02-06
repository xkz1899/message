const ApiError = require("../errors/ApiError")
const authService = require("../service/authService")

class AuthController {
	async registration(req, res, next) {
		try {
			const { login, password } = req.body
			const userData = await authService.registration(login, password)
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true,
			})
			res.json(userData)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async login(req, res, next) {
		try {
			const { login, password } = req.body
			const userData = await authService.login(login, password)
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true,
			})
			res.json(userData)
		} catch (err) {
			return next(ApiError.BadRequest(err.message))
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			await authService.logout(refreshToken)
			res.clearCookie("refreshToken")
			res.json({ message: "Выход осуществлён." })
		} catch (err) {
			return next(ApiError.BadRequest(err.message))
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const userData = await authService.refresh(refreshToken)
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true,
			})
			res.json(userData)
		} catch (err) {
			return next(ApiError.BadRequest(err.message))
		}
	}
}

module.exports = new AuthController()

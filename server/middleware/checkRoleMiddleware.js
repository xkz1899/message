const ApiError = require("../errors/ApiError")
const tokenService = require("../service/tokenService")

module.exports = function (roles) {
	return function (req, res, next) {
		if (req.method === "OPTIONS") {
			next()
		}
		try {
			const accessToken = req.headers.authorization.split(" ")[1]
			if (!accessToken) return next(ApiError.Unauthorized())

			const decoded = tokenService.verifyAccessToken(accessToken)
			let hasRole = false
			decoded.role.forEach(role => {
				if (roles.includes(role)) hasRole = true
			})
			if (!hasRole) return next(ApiError.BadRequest("Недостаточный уровень доступа."))

			req.user = decoded
			next()
		} catch (err) {
			return next(ApiError.Unauthorized())
		}
	}
}

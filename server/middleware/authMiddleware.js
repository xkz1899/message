const ApiError = require("../errors/ApiError")
const tokenService = require("../service/tokenService")

module.exports = function (req, res, next) {
	if (req.method === "OPTIONS") {
		next()
	}
	try {
		const accessToken = req.headers.authorization.split(" ")[1]
		if (!accessToken) {
			return next(ApiError.Unauthorized())
		}
		const decoded = tokenService.verifyAccessToken(accessToken)
		if (!decoded) {
			return next(ApiError.Unauthorized())
		}
		req.user = decoded
		next()
	} catch (err) {
		next(ApiError.Unauthorized())
	}
}

class ApiError extends Error {
	constructor(status, message) {
		super()
		this.status = status
		this.message = message
	}

	static BadRequest(message) {
		return new ApiError(400, message)
	}
	static Unauthorized() {
		return new ApiError(401, "Пользователь не авторизован.")
	}
	static Forbidden(message) {
		return new ApiError(403, message)
	}
	static Internal(message) {
		return new ApiError(500, message)
	}
}

module.exports = ApiError
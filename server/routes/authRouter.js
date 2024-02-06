const authController = require("../controllers/authController")
const Router = require("express").Router
const router = new Router()
const authMiddleware = require("../middleware/authMiddleware")

router.post("/registration", authController.registration)
router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.get("/refresh", authMiddleware, authController.refresh)

module.exports = router

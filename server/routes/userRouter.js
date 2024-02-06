const userController = require("../controllers/userController")
const Router = require("express").Router
const router = new Router()
const authMiddleware = require("../middleware/authMiddleware")

router.get("/", authMiddleware, userController.getAll)
router.get("/:search", authMiddleware, userController.searchUsers)
router.post("/lastseen", authMiddleware, userController.changeLastSeen)
router.patch("/", authMiddleware, userController.changeLogin)
router.patch("/avatar", authMiddleware, userController.uploadAvatar)
router.delete("/avatar", authMiddleware, userController.deleteAvatar)

module.exports = router

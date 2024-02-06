const userController = require("../controllers/userController")
const messageController = require("../controllers/messageController")
const Router = require("express").Router
const router = new Router()
const authMiddleware = require("../middleware/authMiddleware")

router.get("/", authMiddleware, userController.getAll)
router.post("/", authMiddleware, messageController.sendMessage)
router.delete("/chat/:id", authMiddleware, messageController.deleteChat)
router.get("/chat/:id", authMiddleware, messageController.getChat)
router.get("/chat", authMiddleware, messageController.getChats)
router.post("/chat", authMiddleware, messageController.createChat)
router.get("/search", authMiddleware, messageController.searchChat)

module.exports = router

const Router = require("express").Router

const authRouter = require("./authRouter")
const userRouter = require("./userRouter")
const messageRouter = require("./messageRouter")

const router = new Router()

router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/message", messageRouter)

module.exports = router

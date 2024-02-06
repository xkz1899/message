require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { Server } = require("socket.io")
const http = require("http")
const path = require("path")
const fileUpload = require("express-fileupload")

const router = require("./routes/index")
const errorMiddleware = require("./middleware/errorHandlerMiddleware")
const sequelize = require("./db")
const messageService = require("./service/messageService")
const tokenService = require("./service/tokenService")
require("./models/models")

const app = express()
const PORT = process.env.PORT || 5000

app.use(cookieParser())
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
)
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({}))
app.use(express.json())
app.use(`/api`, router)
app.use(errorMiddleware)

const server = http.createServer(app)

const io = new Server(server, {
	cors: {
		origin: process.env.CLIENT_URL,
		methods: ["GET", "POST", "DELETE"],
	},
})

io.on("connection", socket => {
	socket.on("deleteMessage", async id => {
		const deleteId = await messageService.deleteMessage(id)
		await io.emit("deletedMessage", deleteId)
	})

	socket.on("sendMessage", async ({ message, chatId, accessToken }) => {
		const user = await tokenService.verifyAccessToken(accessToken)
		await messageService.sendMessage(chatId, user.id, message)
		const response = await messageService.getChat(chatId)
		await io.emit("message", response)
	})
})

const start = () => {
	try {
		sequelize.authenticate()
		sequelize.sync()
		server.listen(PORT, () =>
			console.log(`Server started and work at ${PORT} port...`)
		)
	} catch (err) {
		console.log(err)
	}
}
start()

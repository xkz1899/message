const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const User = sequelize.define("user", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	login: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	avatar: { type: DataTypes.TEXT },
	lastSeen: { type: DataTypes.DATE, defaultValue: Date.now() },
})

const Token = sequelize.define("token", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	refresh_token: { type: DataTypes.TEXT },
})

const Role = sequelize.define("role", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	role: { type: DataTypes.STRING, defaultValue: "user" },
})

const Chat = sequelize.define("chat", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const UserChat = sequelize.define("userChat", {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	}, { createdAt: false, timestamps: false })

const Message = sequelize.define("message", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	message: { type: DataTypes.TEXT }})

//one => User => many => Token
User.hasOne(Token)
Token.belongsTo(User)

//one => User => many => Role
User.hasOne(Role)
Role.belongsTo(User)

//one => User => many => UserChat
User.hasMany(UserChat)
UserChat.belongsTo(User)

//one => Chat => many => UserChat
Chat.hasMany(UserChat)
UserChat.belongsTo(Chat)

//one => Chat => many => Message
Chat.hasMany(Message)
Message.belongsTo(Chat)

//one => User => many => Message
User.hasMany(Message)
Message.belongsTo(User)

module.exports = {
	User,
	Token,
	Role,
	Chat,
	UserChat,
	Message,
}

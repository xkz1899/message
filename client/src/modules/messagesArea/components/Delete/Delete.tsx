import React from "react"
import { io } from "socket.io-client"
import { useAppDispatch } from "../../../../hooks/redux"
import { deleteMessage } from "../../reducers/messageReducer"
import st from "./Delete.module.scss"

interface IDelete {
	id: number
}

const Delete = ({ id }: IDelete) => {
	const URL = process.env.REACT_APP_API_URL || "http://localhost:5000"
	const socket = io(URL)
	const dispatch = useAppDispatch()

	const deleteHandler = () => {
		socket.emit("deleteMessage", id)
		socket.on("deletedMessage", (id: number) => {
			dispatch(deleteMessage(id))
		})
	}

	return (
		<button onClick={() => deleteHandler()} className={st.delete}>
			Delete
		</button>
	)
}

export default Delete

import { useEffect, useRef, useState } from "react"
import { MdSend } from "react-icons/md"
import { io } from "socket.io-client"

import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { setSelectedUser } from "../contactList/reducers/contactReducer"
import Correspondence from "./components/Correspondence/Correspondence"
import EmptyMessageArea from "./components/emptyMessageArea/EmptyMessageArea"
import HeaderArea from "./components/HeaderArea/HeaderArea"
import InputSendMessage from "./components/InputSendMessage/InputSendMessage"
import st from "./MessageArea.module.scss"
import { deleteMessage, setMessage } from "./reducers/messageReducer"
import { Message } from "./reducers/type"
import { getMessage } from "./services/messageService"

const MessagesArea = () => {
	const { selectedUser, currentChat } = useAppSelector(
		state => state.contactReducer
	)
	const { messages, isLoading } = useAppSelector(state => state.messageReducer)
	const dispatch = useAppDispatch()
	const URL = process.env.REACT_APP_API_URL || "http://localhost:5000"
	const socket = io(URL)
	const ref = useRef<HTMLDivElement | null>(null)

	const [currentMessage, setCurrentMessage] = useState("")

	useEffect(() => {
		socket.on("message", async (messages: Message[]) => {
			await dispatch(setMessage(messages))
		})
		socket.on("deletedMessage", (id: number) => {
			dispatch(deleteMessage(id))
		})
	}, [])

	useEffect(() => {
		if (!isLoading) {
			ref.current?.scrollTo(0, ref.current?.scrollHeight)
		}
	}, [isLoading])

	useEffect(() => {
		currentChat && dispatch(getMessage(currentChat))
	}, [currentChat])

	const sendMessageHandler = () => {
		if (currentMessage.length > 0) {
			socket.emit("sendMessage", {
				message: currentMessage,
				chatId: currentChat,
				accessToken: localStorage.getItem("accessToken"),
			})
			setCurrentMessage("")
			socket.on("message", async (messages: Message[]) => {
				await dispatch(setMessage(messages))
				await ref.current?.scrollTo(0, ref.current?.scrollHeight)
			})
		}
	}
	return (
		<>
			{selectedUser ? (
				<div
					className={st.wrap_message}
					onKeyUp={e => e.key === "Escape" && dispatch(setSelectedUser(null))}
				>
					<HeaderArea />

					<div className={st.wrap}>
						<div className={st.message} ref={ref}>
							{messages?.map(mess =>
								mess.userId === selectedUser.id ? (
									<Correspondence key={mess.id} message={mess} user={true} />
								) : (
									<Correspondence key={mess.id} message={mess} user={false} />
								)
							)}
						</div>
					</div>
					<div className={st.send_message}>
						<InputSendMessage
							value={currentMessage}
							setValue={setCurrentMessage}
						/>
						<button className={st.send_btn} onClick={sendMessageHandler}>
							<MdSend />
						</button>
					</div>
				</div>
			) : (
				<EmptyMessageArea />
			)}
		</>
	)
}

export default MessagesArea

import { BiUserCircle } from "react-icons/bi"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { IResponseUser } from "../../models/IResponseUser"
import { setCurrentChat, setSelectedUser } from "../../reducers/contactReducer"
import st from "./ContactItem.module.scss"

interface IContactItem {
	data: IResponseUser[]
}

const ContactItem = ({ data }: IContactItem) => {
	const dispatch = useAppDispatch()
	const { selectedUser } = useAppSelector(state => state.contactReducer)
	const style = [st.item]
	selectedUser?.id === data[0].userChats[0].user.id && style.push(st.active)

	return (
		<button
			onClick={() => {
				dispatch(setSelectedUser(data[0].userChats[0].user))
				dispatch(setCurrentChat(data[0].userChats[0].chatId))
			}}
			className={style.join(" ")}
		>
			<>
				{data[0].userChats[0].user.avatar ? (
					<img
						src={
							process.env.REACT_APP_API_URL +
							"/" +
							data[0].userChats[0].user.avatar
						}
						className={st.avatar}
						alt=""
					/>
				) : (
					<BiUserCircle className={st.avatar} />
				)}
			</>
			<div className={st.content}>
				<div className={st.top_block}>
					<p className={st.login}>{data[0]?.userChats[0].user.login}</p>
					<p>
						{data[0]?.userChats[0].user.lastSeen
							.replace(/T/, " ")
							.slice(11, 16)}
					</p>
				</div>
				<p className={st.message}>
					{data[0]?.messages[0]?.message
						? data[0]?.messages[0]?.message.slice(0, 12)
						: "Here will you message."}
				</p>
			</div>
		</button>
	)
}

export default ContactItem

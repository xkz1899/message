import React from "react"
import { BiUserCircle } from "react-icons/bi"
import { io } from "socket.io-client"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { User } from "../../models/IResponseUser"
import { setContactList, setSelectedUser } from "../../reducers/contactReducer"
import { createChat } from "../../services/contactService"
import st from "./SearchItem.module.scss"

interface ISearchItem {
	user: User
	setSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchItem = ({ user, setSearch }: ISearchItem) => {
	const dispatch = useAppDispatch()
	const { selectedUser } = useAppSelector(state => state.contactReducer)

	const URL = process.env.REACT_APP_API_URL || "http://localhost:5000"
	const socket = io(URL)

	const style = [st.item]
	selectedUser?.id === user.id && style.push(st.active)

	return (
		<button
			onClick={() => {
				setSearch("")
				dispatch(createChat(user.id))
				dispatch(setSelectedUser(user))
			}}
			className={style.join(" ")}
		>
			<>
				{user.avatar ? (
					<img
						src={process.env.REACT_APP_API_URL + "/" + user.avatar}
						className={st.avatar}
						alt=""
					/>
				) : (
					<BiUserCircle className={st.avatar} />
				)}
			</>
			<div className={st.content}>
				<div className={st.top_block}>
					<p className={st.login}>{user.login}</p>
					<p>{user.lastSeen.replace(/T/, " ").slice(11, 16)}</p>
				</div>
				<p className={st.message}>"Here will you message.</p>
			</div>
		</button>
	)
}

export default SearchItem

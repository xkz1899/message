import { SetStateAction } from "react"
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai"
import { BiUserCircle } from "react-icons/bi"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import {
	setCurrentChat,
	setSelectedUser,
} from "../../../contactList/reducers/contactReducer"
import { getAllUsers } from "../../../contactList/services/contactService"
import { deleteChat } from "../../services/messageService"
import st from "./UserCart.module.scss"

interface IUserCart {
	setVisible: React.Dispatch<SetStateAction<boolean>>
}

const UserCart = ({ setVisible }: IUserCart) => {
	const { selectedUser } = useAppSelector(state => state.contactReducer)

	const { currentChat } = useAppSelector(state => state.contactReducer)
	const dispatch = useAppDispatch()

	const deleteDialogHandler = () => {
		dispatch(deleteChat(currentChat!))
		dispatch(getAllUsers())
		dispatch(setSelectedUser(null))
		dispatch(setCurrentChat(null))
	}

	return (
		<div className={st.wrap}>
			<div className={st.header}>
				<p className={st.title}>User Info</p>
				<button
					className={st.close}
					onClick={() => setVisible(false)}
					title="Close"
				>
					<AiOutlineClose />
				</button>
			</div>
			<div className={st.body}>
				<div className={st.user}>
					{selectedUser?.avatar ? (
						<img
							className={st.avatar}
							src={process.env.REACT_APP_API_URL + "/" + selectedUser?.avatar}
							alt=""
						/>
					) : (
						<BiUserCircle className={st.avatar} />
					)}
					<div>
						<p className={st.name}>{selectedUser?.login}</p>
						<p className={st.last_seen}>
							last seen {selectedUser?.lastSeen.replace(/T/, " ").slice(0, 16)}
						</p>
					</div>
				</div>
				<button onClick={() => deleteDialogHandler()} className={st.trash}>
					<AiOutlineDelete />
					Delete dialog
				</button>
			</div>
		</div>
	)
}

export default UserCart

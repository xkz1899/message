import { useState } from "react"
import { BiUserCircle } from "react-icons/bi"
import { MdArrowBack } from "react-icons/md"
import {
	setSelectedUser,
	setCurrentChat,
} from "../../../contactList/reducers/contactReducer"

import Modal from "../../../../components/Modal/Modal"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import st from "./HeaderArea.module.scss"
import UserCart from "./../UserCart/UserCart"

const HeaderArea = () => {
	const { selectedUser } = useAppSelector(state => state.contactReducer)
	const [visibleCart, setVisibleCart] = useState(false)
	const dispatch = useAppDispatch()

	const hideChat = () => {
		dispatch(setSelectedUser(null))
		dispatch(setCurrentChat(null))
	}

	return (
		<div className={st.wrap}>
			<div className={st.wrap__user}>
				<button className={st.btn_back} onClick={() => hideChat()}>
					<MdArrowBack />
				</button>
				<button className={st.user} onClick={() => setVisibleCart(true)}>
					{selectedUser?.avatar ? (
						<img
							className={st.avatar}
							src={process.env.REACT_APP_API_URL + "/" + selectedUser.avatar}
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
				</button>
			</div>

			<Modal visible={visibleCart} setVisible={setVisibleCart}>
				<UserCart setVisible={setVisibleCart} />
			</Modal>
		</div>
	)
}

export default HeaderArea

import { useEffect, useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx"

import { useDelay } from "../../hooks/delay"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import BurgerMenu from "./components/BurgerMenu/BurgerMenu"
import ContactItem from "./components/ContactItem/ContactItem"
import InputSearch from "./components/InputSearch/InputSearch"
import SearchItem from "./components/searchItem/SearchItem"
import st from "./ContactList.module.scss"
import { setSearchVisible } from "./reducers/contactReducer"
import { getAllUsers, searchUsers } from "./services/contactService"

const ContactList = () => {
	const dispatch = useAppDispatch()
	const { contactsList, isSearch, searchList, currentChat } = useAppSelector(
		state => state.contactReducer
	)

	const [search, setSearch] = useState("")
	const [visibleBurger, setVisibleBurger] = useState(false)

	const value = useDelay(search)
	const style = [st.wrap]

	useEffect(() => {
		dispatch(getAllUsers())
	}, [])

	useEffect(() => {
		if (value.length > 0) {
			dispatch(setSearchVisible(true))
			dispatch(searchUsers(value))
		} else {
			dispatch(setSearchVisible(false))
		}
	}, [value])

	if (currentChat === null) {
		style.pop()
	} else {
		style.push(st.hide)
	}

	return (
		<div className={style.join(" ")}>
			<div
				className={st.header_wrap}
				onMouseLeave={() => setVisibleBurger(false)}
			>
				<button
					className={st.burger}
					onClick={() => setVisibleBurger(!visibleBurger)}
				>
					<RxHamburgerMenu />
				</button>
				<InputSearch value={search} setValue={setSearch} />
				<BurgerMenu visible={visibleBurger} />
			</div>
			<div className={st.content}>
				{!isSearch ? (
					contactsList.length ? (
						contactsList.map(data => (
							<ContactItem key={data[0].id} data={data} />
						))
					) : (
						<p className={st.empty}>No chat found</p>
					)
				) : searchList?.length ? (
					searchList.map(user => (
						<SearchItem key={user.id} user={user} setSearch={setSearch} />
					))
				) : (
					<p className={st.empty}>No chat found</p>
				)}
			</div>
		</div>
	)
}

export default ContactList

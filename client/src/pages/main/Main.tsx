import { useAppSelector } from "../../hooks/redux"
import { ContactsList } from "../../modules/contactList/index"
import { Settings } from "../../modules/settings"
import { MessagesArea } from "./../../modules/messagesArea"
import st from "./Main.module.scss"

const Main = () => {
	const { settings } = useAppSelector(state => state.contactReducer)
	return (
		<div className={st.main_wrap}>
			<>{settings ? <Settings /> : <ContactsList />}</>
			<MessagesArea />
		</div>
	)
}

export default Main

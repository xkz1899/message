import { useAppSelector } from "../../../../hooks/redux"
import st from "./EmptyMessageArea.module.scss"

const EmptyMessageArea = () => {
	const { currentUser } = useAppSelector(state => state.authReducer)

	return (
		<div className={st.wrap}>
			<h2>
				Welcome,{" "}
				{currentUser?.login[0].toUpperCase() + "" + currentUser?.login.slice(1)}
				!
			</h2>
			<h3>Select a chat to start messaging.</h3>
		</div>
	)
}

export default EmptyMessageArea

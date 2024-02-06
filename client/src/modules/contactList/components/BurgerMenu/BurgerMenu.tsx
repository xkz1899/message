import { AiOutlineSetting } from "react-icons/ai"
import { BiExit } from "react-icons/bi"

import { useAppDispatch } from "../../../../hooks/redux"
import { logoutService } from "../../../authorization/services/authService"
import { setSettings } from "../../reducers/contactReducer"
import st from "./BurgerMenu.module.scss"

interface Burger {
	visible: boolean
}

const BurgerMenu = ({ visible }: Burger) => {
	const dispatch = useAppDispatch()

	return (
		<div className={[st.wrap, visible ? st.active : ""].join(" ")}>
			<button onClick={() => dispatch(setSettings(true))}>
				<AiOutlineSetting />
				Settings
			</button>
			<button onClick={() => dispatch(logoutService())} className={st.leave}>
				<BiExit />
				Leave
			</button>
		</div>
	)
}

export default BurgerMenu

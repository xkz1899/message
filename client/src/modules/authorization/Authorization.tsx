import { useState } from "react"
import { GiMonkey } from "react-icons/gi"
import {
	setCurrentChat,
	setSelectedUser,
} from "../contactList/reducers/contactReducer"

import { useAppDispatch, useAppSelector } from "./../../hooks/redux"
import st from "./Authorization.module.scss"
import AuthButton from "./components/AuthButton/AuthButton"
import LoginInput from "./components/LoginInput/loginInput"
import PasswordInput from "./components/PasswordInput/PasswordInput"
import { loginService, registrationService } from "./services/authService"

const Authorization = () => {
	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")

	const { error } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	const loginUser = () => {
		dispatch(loginService(login, password))
		dispatch(setSelectedUser(null))
		dispatch(setCurrentChat(null))
	}

	const registrationUser = () => {
		dispatch(registrationService(login, password))
		dispatch(setSelectedUser(null))
		dispatch(setCurrentChat(null))
	}

	return (
		<div className={st.wrap}>
			{error && <div className={st.error}>{error}</div>}
			<div className={st.form}>
				<GiMonkey className={st.title} />
				<LoginInput login={login} setLogin={setLogin} />
				<PasswordInput password={password} setPassword={setPassword} />
				<AuthButton foo={loginUser} text="LogIn" />
				<AuthButton foo={registrationUser} text="Registration" />
			</div>
		</div>
	)
}

export default Authorization

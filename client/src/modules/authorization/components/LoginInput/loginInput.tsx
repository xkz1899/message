import React, { useState } from "react"
import st from "./LoginInput.module.scss"

interface ILoginInput {
	login: string
	setLogin: React.Dispatch<React.SetStateAction<string>>
}

const LoginInput = ({ login, setLogin }: ILoginInput) => {
	const [isFocus, setIsFocus] = useState(false)

	const meaning = [st.meaning]
	if (isFocus) meaning.push(st.active)

	return (
		<div className={st.login}>
			<input
				id="login"
				type="text"
				placeholder={isFocus ? "" : "Login"}
				className={st.login_input}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				value={login}
				onChange={e => setLogin(e.target.value)}
			/>
			<p className={meaning.join(" ")}>Login</p>
		</div>
	)
}

export default LoginInput

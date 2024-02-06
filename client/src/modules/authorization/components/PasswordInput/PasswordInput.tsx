import React, { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import st from "./PasswordInput.module.scss"

interface IPasswordInput {
	password: string
	setPassword: React.Dispatch<React.SetStateAction<string>>
}

const PasswordInput = ({ password, setPassword }: IPasswordInput) => {
	const [isFocus, setIsFocus] = useState(false)
	const [isPassword, setIsPassword] = useState(false)

	const meaning = [st.meaning]
	if (isFocus) meaning.push(st.active)

	return (
		<div className={st.password}>
			<input
				id="password"
				type={isPassword ? "text" : "password"}
				placeholder={isFocus ? "" : "Password"}
				className={st.password_input}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<p className={meaning.join(" ")}>Password</p>
			<button
				tabIndex={-1}
				title={!isPassword ? "Показать" : "Скрыть"}
				className={st.eye}
				onClick={() => setIsPassword(!isPassword)}
			>
				{!isPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
			</button>
		</div>
	)
}
export default PasswordInput

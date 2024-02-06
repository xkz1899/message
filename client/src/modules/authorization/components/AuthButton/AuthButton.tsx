import React from "react"
import st from "./AuthButton.module.scss"

interface IAuthButton {
	text: string
	foo: () => void
}

const AuthButton = ({ text, foo }: IAuthButton) => {
	return (
		<button onClick={foo} className={st.btn}>
			{text}
		</button>
	)
}

export default AuthButton

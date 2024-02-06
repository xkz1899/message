import React from "react"
import st from "./Modal.module.scss"

interface IModal {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
	children: React.ReactNode
}

const Modal = ({ visible, setVisible, children }: IModal) => {
	return (
		<div
			className={[st.wrap, visible ? st.active : ""].join(" ")}
			onClick={() => setVisible(false)}
		>
			<div className={st.main} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}

export default Modal

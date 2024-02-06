import React, { useState } from "react"
import st from "./Correspondence.module.scss"
import { Message } from "../../reducers/type"
import Delete from "../Delete/Delete"

interface ICorrespondence {
	message: Message
	user: boolean
}

const Correspondence = ({ message, user }: ICorrespondence) => {
	const [deleteVisible, setDeleteVisible] = useState(false)

	const deleteHandler = (
		e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
	) => {
		e.preventDefault()
		setDeleteVisible(!deleteVisible)
	}

	return (
		<>
			<p
				onContextMenu={e => deleteHandler(e)}
				onMouseLeave={() => setDeleteVisible(false)}
				className={user ? st.other : st.user}
			>
				{deleteVisible && <Delete id={message.id} />}
				{message.message} <span>{message.updatedAt.slice(11, 16)}</span>
			</p>
		</>
	)
}

export default Correspondence

import EmojiPicker, { Theme } from "emoji-picker-react"
import { EmojiClickData } from "emoji-picker-react/dist/types/exposedTypes"
import { useState, useEffect, useRef } from "react"
import { FaRegSmile } from "react-icons/fa"
import { useAppSelector } from "../../../../hooks/redux"

import st from "./InputSendMessage.module.scss"

interface IInputSendMessage {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

const InputSendMessage = ({ value, setValue }: IInputSendMessage) => {
	const [showSmile, setShowSmile] = useState(false)
	const { selectedUser } = useAppSelector(state => state.contactReducer)
	const inp = useRef<HTMLInputElement | null>(null)

	const handleEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
		let message = value
		message += emoji.emoji
		setValue(message)
	}

	useEffect(() => {
		setValue("")
	}, [selectedUser])

	useEffect(() => {
		inp.current?.focus()
	})

	return (
		<div className={st.wrap_input}>
			<button className={st.smile} onClick={() => setShowSmile(!showSmile)}>
				<FaRegSmile />
			</button>
			{showSmile && (
				<div className={st.picker} onMouseLeave={e => setShowSmile(false)}>
					<EmojiPicker onEmojiClick={handleEmojiClick} theme={Theme.AUTO} />
				</div>
			)}
			<input
				ref={inp}
				type="text"
				className={st.message}
				placeholder="Message"
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
		</div>
	)
}

export default InputSendMessage

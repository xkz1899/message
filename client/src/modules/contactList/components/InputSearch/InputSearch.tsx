import React, { useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import st from "./InputSearch.module.scss"

interface ISearch {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

const InputSearch = ({ value, setValue }: ISearch) => {
	const [active, setActive] = useState(false)

	const style = [st.search, active ? st.active : ""]

	return (
		<div className={style.join(" ")}>
			<AiOutlineSearch />
			<input
				type="text"
				placeholder="Поиск"
				onFocus={() => setActive(true)}
				onBlur={() => setActive(false)}
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
		</div>
	)
}

export default InputSearch

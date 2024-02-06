import { useEffect, useState } from "react"

export const useDelay = (value: string, delay: number = 500) => {
	const [state, setState] = useState(``)

	useEffect(() => {
		const handler = setTimeout(() => setState(value), delay)
		return () => clearTimeout(handler)
	}, [value, delay])

	return state
}

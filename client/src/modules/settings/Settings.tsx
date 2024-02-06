import { useState, useEffect } from "react"
import { BiArrowBack } from "react-icons/bi"
import { FaUserAlt } from "react-icons/fa"
import { MdAddAPhoto, MdModeEditOutline } from "react-icons/md"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { setSettings } from "../contactList/reducers/contactReducer"
import { changeAvatar, changeLogin } from "./service/settings"
import { VscSaveAs } from "react-icons/vsc"
import st from "./Settings.module.scss"
import { AiTwotoneEdit } from "react-icons/ai"

const Settings = () => {
	const { currentUser } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	const [image, setImage] = useState<FileList | null>()
	const [login, setLogin] = useState(currentUser!.login)
	const [changeVisible, setChangeVisible] = useState(false)

	useEffect(() => {
		if (image) {
			dispatch(changeAvatar(image[0]))
		}
	}, [image])

	const changeCurrentLogin = () => {
		dispatch(changeLogin(login))
		setChangeVisible(false)
	}

	return (
		<div className={st.wrap}>
			<div className={st.settings_header}>
				<div className={st.block}>
					<button
						className={st.back}
						onClick={() => dispatch(setSettings(false))}
					>
						<BiArrowBack />
					</button>
					<h4 className={st.title}>Settings</h4>
				</div>
				<button
					title="Change login"
					className={st.edit}
					onClick={() => setChangeVisible(!changeVisible)}
				>
					<MdModeEditOutline />
				</button>
			</div>
			<div className={st.body}>
				<div className={st.image}>
					{currentUser?.avatar ? (
						<img
							src={process.env.REACT_APP_API_URL + "/" + currentUser?.avatar}
							alt=""
						/>
					) : (
						<FaUserAlt className={st.avatar} />
					)}
					<button className={st.add} title="Add photo">
						<label htmlFor="add-avatar">
							<MdAddAPhoto />
							<input
								type="file"
								id="add-avatar"
								onChange={e => setImage(e.target.files)}
							/>
						</label>
					</button>
					<div className={st.login}>
						<div className={st.login_name}>
							<p>{currentUser?.login}</p>
						</div>
						<span className={st.last_seen}>
							last seen: {currentUser?.lastSeen.slice(11).slice(0, 8)}
						</span>
					</div>
				</div>
				<div className={[st.change, changeVisible ? st.active : ""].join(" ")}>
					<AiTwotoneEdit className={st.change_svg} />
					<input
						type="text"
						className={st.change_login}
						value={login}
						onChange={e => setLogin(e.target.value)}
					/>
					<button
						onClick={changeCurrentLogin}
						className={st.save}
						title="Save login"
					>
						<VscSaveAs />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Settings

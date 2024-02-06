import Main from "./pages/main/Main"
import Auth from './pages/auth/Auth';

export interface IRoute {
	path: string
	Element: React.ElementType
}

export const authRoute: IRoute[] = [
	{ path: "/", Element: Main },
	{ path: "/chat/:id", Element: Main },
]

export const privateRoute: IRoute[] = [
	{ path: "/", Element: Auth },
]

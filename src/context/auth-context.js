import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
	isLoggedIn: false,
	onLogout: () => {},
    onLogin: () => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storedSession = localStorage.getItem("isLoggedIn");

		if (storedSession === "1") setIsLoggedIn(true);
	}, []);

	const logoutHandler = () => {
		localStorage.clear();
		setIsLoggedIn(false);
	};

	const loginHandler = () => {
		localStorage.setItem("isLoggedIn", "1");
		setIsLoggedIn(true);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;

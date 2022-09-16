import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
	isLoggedIn: false,
	isLoginError: false,
	errorMsg: "",
	onLogout: () => {},
	onLogin: () => {},
	onSignup: () => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoginError, setIsLoginError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		const storedSession = localStorage.getItem("isLoggedIn");

		if (storedSession === "1") setIsLoggedIn(true);
	}, []);

	const logoutHandler = async () => {
		const res = await fetch("http://localhost:8000/user/logout");

		if (!res.ok) {
			return;
		}

		localStorage.clear();
		setIsLoginError(false);
		setIsLoggedIn(false);
	};

	const loginHandler = async (userData, isSignin) => {
		const data = await fetchUserData(userData, isSignin);

		if (data.name) {
			localStorage.setItem("isLoggedIn", "1");
			localStorage.setItem("expenses", JSON.stringify(data.expenses));
			setIsLoginError(false);
			setErrorMsg("");
			setIsLoggedIn(true);
		} else {
			setIsLoginError(true);
			setErrorMsg(data.errRes);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				isLoginError: isLoginError,
				errorMsg: errorMsg,
				onLogout: logoutHandler,
				onLogin: loginHandler,
				onSignup: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

async function fetchUserData(userData, isSignin = true) {
	// Fetch User Data
	console.log(userData);
	try {
		const res = await fetch(
			`http://localhost:8000/user/${isSignin ? "signin" : "signup"}`,
			{
				method: "POST",
				// credentials: "include",
				headers: {
					"Content-Type": "application/json",
					// "Access-Control-Allow-Credentials": true,
					// "Access-Control-Allow-Origin": "http://localhost:8000",
				},
				body: JSON.stringify(userData),
			}
		);

		const resData = await res.json();

		if (!res.ok) {
			throw new Error(resData);
		}

		return {
			name: resData.username,
			expenses: resData.expenses ?? [],
		};
	} catch (err) {
		return { errRes: err.message };
	}

	// 		expenses: [
	// 			{
	// 				id: "e1",
	// 				title: "Toilet Paper",
	// 				amount: 94.12,
	// 				date: new Date(2022, 7, 10),
	// 			},
	// 		],
}

export default AuthContext;

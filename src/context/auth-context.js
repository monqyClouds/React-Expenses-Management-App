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

	const logoutHandler = () => {
		// Logout API
		localStorage.clear();
		setIsLoginError(false);
		setIsLoggedIn(false);
	};

	const loginHandler = async (userData, isSignin) => {
		console.log({ userData, isSignin });
		// Login API
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
				headers: {
					"Content-Type": "application/json",
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

	// if (!isSignin) {

	// } else {
	// 	return {
	// 		name: "Qing",
	// 		expenses: [
	// 			{
	// 				id: "e1",
	// 				title: "Toilet Paper",
	// 				amount: 94.12,
	// 				date: new Date(2022, 7, 10),
	// 			},
	// 			{
	// 				id: "e2",
	// 				title: "New TV",
	// 				amount: 799.49,
	// 				date: new Date(2021, 2, 8),
	// 			},
	// 			{
	// 				id: "e3",
	// 				title: "Car Insurance",
	// 				amount: 295.85,
	// 				date: new Date(2021, 8, 16),
	// 			},
	// 			{
	// 				id: "e4",
	// 				title: "Groceries",
	// 				amount: 102.75,
	// 				date: new Date(2021, 9, 11),
	// 			},
	// 		],
	// 	};
	// }
}

export default AuthContext;

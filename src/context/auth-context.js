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
		// Logout API
		localStorage.clear();
		setIsLoggedIn(false);
	};

	const loginHandler = async (userData) => {
		// Login API
		const data = await fetchUserData(userData);
		localStorage.setItem("isLoggedIn", "1");
		localStorage.setItem("expenses", JSON.stringify(data.expenses));
		localStorage.setItem("totalExpense", JSON.stringify(data.totalExpenses));
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

async function fetchUserData(userData, isSignin = true) {
    // Fetch User Data
    

	return {
		name: "Qing",
		expenses: [
			{
				id: "e1",
				title: "Toilet Paper",
				amount: 94.12,
				date: new Date(2022, 7, 10),
			},
			{
				id: "e2",
				title: "New TV",
				amount: 799.49,
				date: new Date(2021, 2, 8),
			},
			{
				id: "e3",
				title: "Car Insurance",
				amount: 295.85,
				date: new Date(2021, 8, 16),
			},
			{
				id: "e4",
				title: "Groceries",
				amount: 102.75,
				date: new Date(2021, 9, 11),
			},
		],
		totalExpenses: 0,
	};
}

export default AuthContext;

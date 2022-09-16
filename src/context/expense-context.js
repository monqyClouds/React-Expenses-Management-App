import { createContext, useReducer, useEffect, useContext } from "react";
import AuthContext from "./auth-context";

const ExpenseContext = createContext({
	expenses: [],
	isError: false,
	errMsg: "",
	oldestYear: 2019,
	earliestYear: new Date(Date.now()).getFullYear(),
	populateExpenses: () => {},
	onAddExpense: () => {},
	onDeleteExpense: () => {},
});

const expenseReducer = (state, action) => {
	// const fulfilledState = await state;
	const fulfilledState = state;
	const expenseData = action.data;

	if (action.type === "ADD_EXPENSE") {
		const processedData = {
			id: expenseData.id,
			amount: expenseData.amount,
			title: expenseData.title,
			date: new Date(expenseData.date),
		};
		const newExpenses = [...fulfilledState.expenses, processedData];

		localStorage.setItem("expenses", JSON.stringify(newExpenses));

		return {
			expenses: newExpenses,
			isError: false,
			errMsg: "",
			oldestYear: Math.min(
				fulfilledState.oldestYear,
				processedData.date.getFullYear()
			),
			earliestYear: Math.max(
				fulfilledState.earliestYear,
				processedData.date.getFullYear()
			),
		};
	} else if (action.type === "REMOVE_EXPENSE") {
		// Remove expense API

		const newExpenses = fulfilledState.expenses.filter(
			(expense) => expense.id !== expenseData.id
		);

		return {
			expenses: newExpenses,
			isError: false,
			errMsg: "",
		};
	} else if (action.type === "POPULATE_EXPENSE") {
		const expenses = JSON.parse(localStorage.getItem("expenses"));

		let oldestYear = new Date(Date.now()).getFullYear();
		let earliestYear = new Date(Date.now()).getFullYear();

		expenses.forEach((expense) => {
			expense.date = new Date(expense.date);
			oldestYear = Math.min(oldestYear, expense.date.getFullYear());
			earliestYear = Math.max(earliestYear, expense.date.getFullYear());
		});

		return { ...fulfilledState, expenses, oldestYear, earliestYear };
	} else if (action.type === "ERROR") {
		return {
			isError: true,
			errMsg: action.data ?? "",
		};
	}
};

export const ExpenseContextProvider = (props) => {
	const ctx = useContext(AuthContext);

	const [expenseState, dispatchExpense] = useReducer(expenseReducer, {
		expenses: [],
		isError: false,
		errMsg: "",
	});

	const addExpenseHandler = async (expense) => {
		const newExpense = await expenseRequest(expense, true);

		if (typeof newExpense !== "string" && newExpense !== false) {
			dispatchExpense({ type: "ADD_EXPENSE", data: newExpense });
		} else if (newExpense === "logout") {
			ctx.onLogout();
		} else {
			dispatchExpense({ type: "ERROR", data: newExpense });
		}
	};

	const deleteExpenseHandler = (expense) => {
		dispatchExpense({ type: "REMOVE_EXPENSE", data: expense });
	};

	useEffect(() => {
		dispatchExpense({ type: "POPULATE_EXPENSE" });
	}, []);

	return (
		<ExpenseContext.Provider
			value={{
				expenses: expenseState.expenses,
				isError: expenseState.isError,
				errMsg: "",
				oldestYear: expenseState.oldestYear,
				earliestYear: expenseState.earliestYear,
				onAddExpense: addExpenseHandler,
				onDeleteExpense: deleteExpenseHandler,
			}}
		>
			{props.children}
		</ExpenseContext.Provider>
	);
};

async function expenseRequest(expenseData, isAddExpense) {
	const { amount, title, date, id } = expenseData;

	if (isAddExpense) {
		if (
			!amount ||
			amount <= 0 ||
			!title ||
			title.trim() === "" ||
			!date ||
			date instanceof Date !== true
		)
			return false;
	} else {
		if (!id) return false;
	}

	let requestData;

	if (isAddExpense) {
		requestData = {
			amount: expenseData.amount,
			title: expenseData.title,
			date: expenseData.date,
		};
	} else {
		requestData = { id: expenseData.id };
	}

	try {
		const res = await fetch("http://localhost:8000/expense", {
			method: isAddExpense ? "POST" : "DELETE",
			// credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestData),
		});

		const responseData = await res.json();

		if (res.status === 403) {
			return "logout";
		}

		if (!res.ok) {
			throw new Error(responseData);
		}

		return isAddExpense ? responseData : true;
	} catch (err) {
		return err.message;
	}
}

export default ExpenseContext;

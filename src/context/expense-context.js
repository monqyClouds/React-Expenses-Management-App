import { createContext, useReducer, useEffect } from "react";

const ExpenseContext = createContext({
	expenses: [],
	populateExpenses: () => {},
	addExpense: () => {},
	removeExpense: () => {},
});

const expenseReducer = (state, action) => {
	const expenseData = action.data;
	let success;

	if (action.type === "ADD_EXPENSE") {
		// Add expense API

		success = true;

		return {
			expenses: [...state.expenses, expenseData],
			totalExpenenses: (state.totalExpenses += expenseData.amount),
		};
	} else if (action.type === "REMOVE_EXPENSE") {
		// Remove expense API

		state.expenses = state.expenses.filter(
			(expense) => expense.id !== expenseData.id
		);
		state.totalExpenses -= expenseData.amount;

		success = true;
	} else if (action.type === "POPULATE_EXPENSE") {
		const expenses = JSON.parse(localStorage.getItem("expenses"));

		expenses.forEach((expense) => {
			expense.date = new Date(expense.date);
		});

		return { expenses }
	}

	if (success) {
		localStorage.setItem("expenses", JSON.stringify(state.expenses));
	}
};

export const ExpenseContextProvider = (props) => {
	const [expenseState, dispatchExpense] = useReducer(expenseReducer, {
		expenses: []
	});

	const addExpenseHandler = (expense) => {
		dispatchExpense({ type: "ADD_EXPENSE", data: expense });
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
				onAddExpense: addExpenseHandler,
				onDeleteExpense: deleteExpenseHandler,
			}}
		>
			{props.children}
		</ExpenseContext.Provider>
	);
};

export default ExpenseContext;

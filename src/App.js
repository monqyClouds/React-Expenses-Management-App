import React, {useState} from "react";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";


const App = () => {
	const expenses = [
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
	];

	const [expenseList, setExpenses] = useState(expenses);

	const addExpenseHandler = expense => {
		setExpenses(prevExpenses => {
			return [expense, ...prevExpenses]
		});
	}

	return (
		<div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenseList} />
		</div>
	);
}

export default App;

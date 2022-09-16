import React, { useState, useContext } from "react";

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import "./Expenses.css";
import ExpenseContext from "../../context/expense-context";

function Expenses() {
	const ctx = useContext(ExpenseContext);

	const currentYear = new Date(Date.now()).getFullYear().toString();

	// TO DOs
	// 1. set dynamic date
	const [filteredYear, setFilteredYear] = useState(currentYear);

	const filterChangeHandler = (selectedYear) => {
		setFilteredYear(selectedYear);
	};

	console.log({filteredYear})

	let filteredExpenses = [];

	console.log(ctx);

	if (ctx.expenses) {
		filteredExpenses = ctx.expenses.filter((el) => {
			return filteredYear === el.date.getFullYear().toString();
		});
	}

	return (
		<Card className="expenses">
			<ExpensesFilter
				selected={filteredYear}
				onChangeFilter={filterChangeHandler}
			/>
			<ExpensesChart expenses={filteredExpenses} />
			{/* Rendering the expenses as a dynamic list */}
			<ExpensesList items={filteredExpenses} />
		</Card>
	);
}

export default Expenses;

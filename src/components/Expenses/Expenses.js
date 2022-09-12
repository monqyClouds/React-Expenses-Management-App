import React, { useState } from "react";

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import "./Expenses.css";

function Expenses(props) {
	// TO DOs
	// 1. set dynamic date
	const [filteredYear, setFilteredYear] = useState("2022");

	const filterChangeHandler = (selectedYear) => {
		setFilteredYear(selectedYear);
	};

	const filteredExpenses = props.items.filter(
		(el) => filteredYear === el.date.getFullYear().toString()
	);

	return (
		<Card className="expenses">
			<ExpensesFilter
				selected={filteredYear}
				onChangeFilter={filterChangeHandler}
			/>
			<ExpensesChart expenses={ filteredExpenses}/>
			{/* Rendering the expenses as a dynamic list */}
			<ExpensesList items={filteredExpenses} />
		</Card>
	);
}

export default Expenses;

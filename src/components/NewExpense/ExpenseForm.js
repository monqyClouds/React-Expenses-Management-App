import React, { useState, useContext } from "react";
import ExpenseContext from "../../context/expense-context";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
	const [enteredTitle, setEnteredTitle] = useState("");
	const [enteredAmount, setEnteredAmount] = useState("");
	const [enteredDate, setEnteredDate] = useState("");
  const ctx = useContext(ExpenseContext)

	const titleChangeHandler = (event) => {
		setEnteredTitle(event.target.value);
	};

	const amountChangeHandler = (event) => {
		setEnteredAmount(event.target.value);
	};

	const dateChangeHandler = (event) => {
		setEnteredDate(event.target.value);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		const expenseData = {
			title: enteredTitle,
			amount: +enteredAmount,
			date: new Date(enteredDate),
		};

		ctx.onAddExpense(expenseData);

		setEnteredTitle("");
		setEnteredAmount("");
		setEnteredDate("");
	};

  const currentYear = ctx.earliestYear;

	// const [userInput, setUserInput] = useState({
	//   enteredTitle: '',
	//   enteredAmount: '',
	//   enteredDate: ''
	// })

	// const titleChangeHandler = (event) => {
	// 	// Whenever a state is being updated in dependence to other states, use alternate/ function form  of useState() because useState() schedules state update and not immediately
	// 	setUserInput((prevState) => {
	// 		return { ...prevState, enteredTitle: event.target.value };
	// 	});
	// }

	return (
		<form onSubmit={submitHandler}>
			<div className="new-expense__controls">
				<div className="new-expense__control">
					<label>Title</label>
					<input
						type="text"
						value={enteredTitle}
						onChange={titleChangeHandler}
					/>
				</div>
				<div className="new-expense__control">
					<label>Amount</label>
					<input
						type="number"
						min="0.01"
						step="0.01"
						value={enteredAmount}
						onChange={amountChangeHandler}
					/>
				</div>
				<div className="new-expense__control">
					<label>Date</label>

					{/* TO DO
            1. dynamic dates
          */}

					<input
						type="date"
						min="2019-01-01"
						max={`${currentYear}-12-31`}
						value={enteredDate}
						onChange={dateChangeHandler}
					/>
				</div>
			</div>
			<div className="new-expense__actions">
				<button type="submit">Add expense</button>
			</div>
		</form>
	);
};

export default ExpenseForm;

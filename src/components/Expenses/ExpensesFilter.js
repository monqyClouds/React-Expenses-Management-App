import { useContext } from "react";
import ExpenseContext from "../../context/expense-context";

import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
	const ctx = useContext(ExpenseContext);

	const dropdownChangeHandler = (event) => {
		props.onChangeFilter(event.target.value);
	};

	const allYears = [];

	for (let i = ctx.earliestYear; i >= ctx.oldestYear; i--) {
		allYears.push(i);
	}

	return (
		<div className="expenses-filter">
			<div className="expenses-filter__control">
				<label>Filter by year</label>
				<select value={props.selected} onChange={dropdownChangeHandler}>
					{allYears.map((year) => (
						<option value={`${year}`} key={year}>
							{year}
						</option>
					))}
					{/* <option value="2022">2022</option>
					<option value="2021">2021</option>
					<option value="2020">2020</option>
					<option value="2019">2019</option> */}
				</select>
			</div>
		</div>
	);
};

export default ExpensesFilter;

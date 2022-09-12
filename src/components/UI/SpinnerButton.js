import { useState, useEffect } from "react";
import classes from "./SpinnerButton.module.css";

export default function SpinnerButton(props) {
	const [mounted, setMounted] = useState(false);
	const isLoading = props.loading;

	useEffect(() => setMounted(true), []);
	if (!mounted) return null;

	return (
		<button className={classes["spinner-button"]} disabled={isLoading}>
			{isLoading && <span className={`${classes["loading-spinner"]}`}></span>}
			{isLoading && <span>{props.loadingValue}</span>}
			{!isLoading && <span>{props.value}</span>}
		</button>
	);
}

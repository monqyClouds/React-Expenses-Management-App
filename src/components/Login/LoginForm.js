import { useState, useContext } from "react";
import { BiError } from "react-icons/bi";
import AuthContext from "../../context/auth-context";
import SpinnerButton from "../UI/SpinnerButton";

import classes from "./LoginForm.module.css";

const LoginForm = (props) => {
	const [enteredUsername, setEnteredUsername] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [isSignin, setIsSignin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const ctx = useContext(AuthContext);

	const usernameChangeHandler = (event) => {
		setEnteredUsername(event.target.value.trim());
	};

	const passwordChangeHandler = (event) => {
		setEnteredPassword(event.target.value);
	};

	const formTypeChangeHandler = () => {
		if (isSignin) setIsSignin(false);
		else if (!isSignin) setIsSignin(true);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		setIsLoading(true);

		const isValidusername =
			enteredUsername !== "" && enteredUsername.length <= 15;
		const isValidPassword = enteredPassword.length > 0;
		const isValidEntries = isValidusername && isValidPassword;

		if (!isValidEntries) return;

		const loginData = {
			username: enteredUsername,
			password: enteredPassword,
		};

		switch (isSignin) {
			case true:
				console.log("sign in handler");
				ctx.onLogin(loginData, true);
				break;

			case false:
				console.log("sign up handler");
				ctx.onSignup(loginData, false);
				break;

			default:
				break;
		}

		!ctx.isLoginError && setEnteredPassword("");
		!ctx.isLoginError && setEnteredUsername("");

		setIsLoading(false);
	};

	return (
		<div className={classes.formBackground}>
			<form onSubmit={submitHandler} className={classes.form}>
				<h1 className={classes.formHeader}>
					{isSignin ? "Sign in" : "Sign up"}
				</h1>
				<div className={classes.formInputs}>
					<div className={classes.formInput}>
						<label htmlFor="username">Username</label>
						<input
							type={"text"}
							id="username"
							value={enteredUsername}
							onChange={usernameChangeHandler}
							placeholder="username"
							maxLength={20}
							required
						/>
					</div>
					<div className={classes.formInput}>
						<label htmlFor="password">Password</label>
						<input
							type={"password"}
							id="password"
							value={enteredPassword}
							onChange={passwordChangeHandler}
							placeholder="password"
							required
						/>
					</div>
					{ctx.isLoginError && (
						<p className={classes.notification}>
							<BiError /> <span>{ctx.errorMsg}</span>
						</p>
					)}
				</div>
				<div className={classes.formActions}>
					<SpinnerButton
						loading={isLoading}
						loadingValue={isSignin ? "Signin in..." : "Signin up..."}
						value={isSignin ? "Sign in" : "Sign up"}
					/>
					<p>
						{isSignin ? "Don't have an account? " : "Already have an account? "}{" "}
						<span className={classes.formLink} onClick={formTypeChangeHandler}>
							{isSignin ? "create new account" : "login to your account"}
						</span>
					</p>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;

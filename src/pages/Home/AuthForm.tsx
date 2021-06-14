import { AppContext } from "store/AppContext";
import Input from "components/common/Input";
import Alert from "components/common/Alert";
import React, { useState, useContext } from "react";

export interface AuthFormProps {}

const AuthForm: React.SFC<AuthFormProps> = () => {
	const [userDetails, setUserDetails] = useState({
		email: "",
		password: "",
	});
	const [submitting, setSubmitting] = useState(false);
	const [formStatus, setFormStatus] = useState({ type: "", msg: "" });
	const { loginUser, closeModal } = useContext(AppContext);

	const handleInputChange = (ev: any) => {
		const { name, value } = ev.target;
		setUserDetails({ ...userDetails, [name]: value });
	};

	const handleUserLogin = async (ev: any) => {
		ev.preventDefault();
		setSubmitting(true);
		const res = await loginUser(userDetails);
		setSubmitting(false);
		if (res) {
			setFormStatus({ type: "success", msg: "Login Successful!" });
			setTimeout(() => {
				closeModal();
				setUserDetails({ email: "", password: "" });
				resetStatus();
			}, 200);
		} else {
			setSubmitting(false);
		}
	};
	const resetStatus = () => setFormStatus({ type: "", msg: "" });

	return (
		<form className="auth-form" onSubmit={handleUserLogin}>
			{formStatus.type === "success" && (
				<div className="alert-container">
					<Alert
						type="success"
						onClick={resetStatus}
						msg={formStatus.msg || "Successful!"}
					/>
				</div>
			)}
			{formStatus.type === "error" && (
				<div className="alert-container">
					<Alert
						type="error"
						onClick={resetStatus}
						msg={formStatus.msg || "Something went wrong!"}
					/>
				</div>
			)}
			<Input
				type="email"
				placeholder="Enter your email address"
				name="email"
				onChange={handleInputChange}
				required
			/>
			<Input
				type="password"
				placeholder="Enter password"
				name="password"
				onChange={handleInputChange}
				required
			/>

			<button className="auth-btn" type="submit">
				{submitting ? "Logging in..." : "Login"}
			</button>
		</form>
	);
};

export default AuthForm;

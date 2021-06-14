import React from "react";
import CloseIcon from "../../assets/close.svg";

export interface AlertProps {
	msg: string;
	type: "success" | "error" | "";
	onClick?: () => any;
}

const Alert: React.SFC<AlertProps> = ({ msg, type, onClick }) => {
	return (
		<div
			data-testid="alert"
			className={
				"alert " + (type === "success" ? "alert-success" : "alert-error")
			}
		>
			<p>{msg}</p>
			<button onClick={onClick}>
				<img src={CloseIcon} alt="close icon" />
			</button>
		</div>
	);
};

export default Alert;

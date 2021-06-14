import React, { useContext } from "react";
import { AppContext } from "store/AppContext";
import userIcon from "../../assets/person.svg";
import ExitIcon from "../../assets/exit.svg";

import "../index.scss";

const Header = () => {
	const { updateModalState, isLoggedIn, logout } = useContext(AppContext);
	return (
		<div className="header" data-testid="header">
			<div className="logo">
				<p>Shapes</p>
			</div>
			<div>
				{isLoggedIn ? (
					<button
						title="log out"
						data-testid="logout-btn"
						onClick={() => {
							logout();
						}}
					>
						<img src={ExitIcon} alt="log out icon" />
					</button>
				) : (
					<button
						title="log in"
						data-testid="login-btn"
						onClick={() => updateModalState()}
					>
						<img src={userIcon} alt="" />
					</button>
				)}
			</div>
		</div>
	);
};

export default Header;

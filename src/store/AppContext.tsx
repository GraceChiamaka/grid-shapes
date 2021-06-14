import React, { createContext, useState, useEffect, ReactChild } from "react";

type UserProp = {
	email: string;
	password: string;
};

type ContextProps = {
	isLoggedIn: boolean;
	user: UserProp | null;
	updateModalState: () => any;
	showModal: boolean;
	closeModal: () => any;
	loginUser: (data: UserProp) => any;
	logout: () => any;
};

export const AppContext = createContext({} as ContextProps);

const AppContextProvider = ({ children }: { children: ReactChild }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		getLoggedInUser();
	}, []);
	const loginUser = (data: UserProp) => {
		try {
			const serialisedState = JSON.stringify(data);
			localStorage.setItem("USER", serialisedState);
			getLoggedInUser();
			return { msg: "success" };
		} catch (error) {
			return error;
		}
	};
	const logout = () => {
		localStorage.removeItem("USER");
		getLoggedInUser();
	};
	const getLoggedInUser = () => {
		const userData = localStorage.getItem("USER");
		if (userData) {
			setIsLoggedIn(true);
			setUser(JSON.parse(userData));
		} else {
			setIsLoggedIn(false);
		}
	};
	const updateModalState = () => setShowModal(true);
	const closeModal = () => setShowModal(false);
	return (
		<AppContext.Provider
			value={{
				user,
				isLoggedIn,
				loginUser,
				logout,
				updateModalState,
				showModal,
				closeModal,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;

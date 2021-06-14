import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Header from "../Header";
import AppContextProvider from "../../../store/AppContext";

test("Should Render Header Component", () => {
	render(<Header />);
	const alertElement = screen.getByTestId("header");
	expect(alertElement).toBeInTheDocument();
});
test("Should Render Login Button in Header Component", () => {
	render(<Header />);
	const alertElement = screen.getByTestId("login-btn");
	expect(alertElement).toBeInTheDocument();
});
test("Should Render Logout Button in Header Component", () => {
	render(<Header />);
	const alertElement = screen.getByTestId("logout-btn");
	expect(alertElement).toBeInTheDocument();
});

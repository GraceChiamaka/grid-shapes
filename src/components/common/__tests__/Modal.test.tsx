import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Modal from "../Modal";

test("Should Render Modal Component", () => {
	render(<Modal />);
	const modalElement = screen.getByTestId("modal");
	expect(modalElement).toBeInTheDocument();
});

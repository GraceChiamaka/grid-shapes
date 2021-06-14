import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Input from "../Input";

test("Should Render Input Component", () => {
	render(<Input type="text" required onChange="" />);
	const inputElement = screen.getByTestId("input");
	expect(inputElement).toBeInTheDocument();
});

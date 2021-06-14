import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Shape from "../Shape";

test("Should Render Shape Component", () => {
	render(<Shape shape="square" color="gray" />);
	const alertElement = screen.getByTestId("shape-display");
	expect(alertElement).toBeInTheDocument();
});

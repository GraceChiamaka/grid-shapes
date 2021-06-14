import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Alert from "../Alert";

test("Should Render Alert Component", () => {
	render(<Alert type="" msg="" />);
	const alertElement = screen.getByTestId("alert");
	expect(alertElement).toBeInTheDocument();
});

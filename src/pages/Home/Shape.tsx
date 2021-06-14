import React from "react";

export interface ShapeProps {
	shape: "square" | "oval" | "round" | "rectangle" | "triangle";
	color: "red" | "green" | "gray" | "purple" | "yellow" | "blue";
};

const ShapeDisplay = ({ shape, color }: ShapeProps) => {
	return (
		<div className="shade-display-item" data-testid="shape-display">
			<div className={`color-well ${shape} ${color}`}></div>
		</div>
	);
};

export default ShapeDisplay;

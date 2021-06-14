import React, { ReactChild } from "react";

export interface ModalProps {
	children?: ReactChild;
}

const Modal: React.SFC<ModalProps> = ({ children }) => {
	return (
		<div className="modal--backdrop" data-testid="modal">
			<div className="modal--container">
				<div className="modal">{children}</div>
			</div>
		</div>
	);
};

export default Modal;

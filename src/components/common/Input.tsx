import React from "react";

export interface InputProps {
	type: string;
	placeholder?: string;
	id?: string;
	name?: string;
	onChange: any;
	required?: boolean;
}

const Input: React.SFC<InputProps> = ({
	type,
	placeholder,
	onChange,
	id="",
	name,
	required,
}) => {
	return (
		<input
			type={type}
			className="plain-input"
			placeholder={placeholder}
			id={id}
			data-testid="input"
			name={name}
			required={required}
			onChange={onChange}
		/>
	);
};

export default Input;

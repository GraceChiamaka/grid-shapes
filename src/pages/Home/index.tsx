import { data, DataProps } from "./shapes-data";
import React, { useContext, useState, useMemo } from "react";
import { AppContext } from "store/AppContext";
import CloseIcon from "../../assets/close.svg";
import ShapeDisplay from "./Shape";
import Alert from "components/common/Alert";
import Header from "components/common/Header";
import Modal from "components/common/Modal";
import AuthForm from "./AuthForm";
import "./Home.scss";

const colors: string[] = ["red", "blue", "green", "yellow", "purple", "gray"];
const shapes: string[] = ["square", "rectangle", "triangle", "oval", "round"];

const colorsLen = colors.length;
const shapesLen = shapes.length;

const Homepage = () => {
	const { isLoggedIn, showModal, closeModal } = useContext(AppContext);
	const [status, setStatus] = useState({ type: "", msg: "" });
	const [selectedShapeFilter, setSelectedShapeFilter] = useState<string[]>([
		"square",
		"rectangle",
		"triangle",
		"oval",
		"round",
	]);
	const [selectedColorFilter, setSelectedColorFilter] = useState<string[]>([
		"red",
		"blue",
		"green",
		"yellow",
		"purple",
		"gray",
	]);
	const filteredData = useMemo(() => {
		if (!selectedColorFilter.length && !selectedShapeFilter.length) {
			return data;
		}
		return handleDataFilter(selectedShapeFilter, selectedColorFilter);
	}, [selectedShapeFilter, selectedColorFilter]);

	const resultLabel = useMemo(() => {
		return displayHeading();
		// eslint-disable-next-line
	}, [selectedColorFilter, selectedShapeFilter]);

	const handleShapeFilter = (ev: any, shape: string) => {
		if (!isLoggedIn) {
			setStatus({ type: "error", msg: "Please log in to continue" });
		} else {
			if (ev.target.checked) {
				setSelectedShapeFilter([...selectedShapeFilter, shape]);
			} else {
				const result = selectedShapeFilter.filter((item) => item !== shape);
				setSelectedShapeFilter([...result]);
			}
		}
	};
	const handleColorFilter = (ev: any, color: string) => {
		if (!isLoggedIn) {
			setStatus({ type: "error", msg: "Please log in to continue" });
		} else {
			if (ev.target.checked) {
				setSelectedColorFilter([...selectedColorFilter, color]);
			} else {
				const result = selectedColorFilter.filter((item) => item !== color);
				setSelectedColorFilter([...result]);
			}
		}
	};
	const resetStatus = () => setStatus({ type: "", msg: "" });

	function handleDataFilter(
		selectedShapeFilter: string[],
		selectedColorFilter: string[]
	) {
		let filteredResults = [];

		if (selectedShapeFilter.length > 0 && selectedColorFilter.length === 0) {
			filteredResults = data.filter((items) =>
				selectedShapeFilter.includes(items.shape)
			);
		} else if (
			selectedColorFilter.length > 0 &&
			selectedShapeFilter.length === 0
		) {
			filteredResults = data.filter((items) =>
				selectedColorFilter.includes(items.color)
			);
		} else {
			filteredResults = data.filter(
				(items) =>
					selectedColorFilter.includes(items.color) &&
					selectedShapeFilter.includes(items.shape)
			);
		}
		return filteredResults;
	}

	const displayShapes = () => {
		return filteredData.map((shapes: DataProps) => {
			return (
				<ShapeDisplay
					key={shapes.id}
					shape={shapes.shape}
					color={shapes.color}
				/>
			);
		});
	};

	function displayHeading() {
		if (
			selectedShapeFilter.length === shapesLen &&
			selectedColorFilter.length === colorsLen
		) {
			return "All Items";
		} else if (
			(selectedShapeFilter.length > 1 && selectedColorFilter.length === 1) ||
			(selectedShapeFilter.length === 0 && selectedColorFilter.length === 1)
		) {
			return `All ${selectedColorFilter[0]} items`;
		} else if (
			(selectedColorFilter.length > 1 && selectedShapeFilter.length === 1) ||
			(selectedColorFilter.length === 0 && selectedShapeFilter.length === 1)
		) {
			return `All ${selectedShapeFilter[0]} items`;
		} else if (
			selectedColorFilter.length > 1 ||
			selectedShapeFilter.length > 1
		) {
			return "Multiple Items";
		} else if (
			selectedShapeFilter.length === 1 &&
			selectedColorFilter.length === 1
		) {
			return `All ${selectedShapeFilter[0]} ${selectedColorFilter[0]} items`;
		} else {
			return "All items";
		}
	}
	return (
		<div className="homepage-wrapper">
			<Header />
			<div className="homepage-content">
				{status.type === "success" && (
					<div className="alert-container">
						<Alert
							type="success"
							onClick={resetStatus}
							msg={status.msg || "Successful!"}
						/>
					</div>
				)}
				{status.type === "error" && (
					<div className="alert-container">
						<Alert
							type="error"
							onClick={resetStatus}
							msg={status.msg || "Something went wrong!"}
						/>
					</div>
				)}
				{showModal && (
					<Modal>
						<>
							<div className="modal-heading">
								<div className="close">
									<button
										style={{ cursor: "pointer" }}
										onClick={() => closeModal()}
									>
										<img src={CloseIcon} alt="close icon" />
									</button>
								</div>
								<p>Login to continue</p>
							</div>
							<div className="modal-body">
								<AuthForm />
							</div>
						</>
					</Modal>
				)}
				<div className="filter-containter">
					<h3>Filters</h3>
					<div className="shapes-filter">
						<p className="heading">Shapes</p>
						<div className="shapes">
							{shapes.map((item, index) => {
								return (
									<div className="custom-checkbox " key={`${item}-${index}`}>
										<div
											className={
												"checkbox-alt " +
												(selectedShapeFilter.includes(item)
													? "active-checkbox"
													: "")
											}
										>
											{item}
										</div>
										<input
											type="checkbox"
											className="checkbox-input"
											checked={selectedShapeFilter.includes(item)}
											onChange={(ev) => handleShapeFilter(ev, item)}
										/>
									</div>
								);
							})}
						</div>
					</div>
					<div className="color-filter">
						<p className="heading">Colors</p>
						<div className="colors">
							{colors.map((item, index) => {
								return (
									<div className="colors-checkbox " key={`${item}-${index}`}>
										<div
											className={
												"checkbox-alt " +
												item +
												(selectedColorFilter.includes(item)
													? " active-checkbox"
													: "")
											}
										></div>
										<input
											type="checkbox"
											className="checkbox-input"
											checked={selectedColorFilter.includes(item)}
											onChange={(ev) => handleColorFilter(ev, item)}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="shape-display-container">
					<div className="heading">
						{resultLabel} ({filteredData.length})
					</div>
					<div className="shape-content">{displayShapes()}</div>
				</div>
			</div>
		</div>
	);
};

export default Homepage;

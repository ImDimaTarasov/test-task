import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

import InternService from "../../services/InternService";

import "./editIntern.scss";
import arrow from "../../icons/arrow-left.svg";
const EditIntern = () => {
	const { id } = useParams();

	const { getOneIntern, addInternToList } = InternService();

	const [addInternLoading, setAddInternLoading] = useState(false);

	const [intern, setIntern] = useState({
		name: "",
		email: "",
		internshipStart: "",
		internshipEnd: "",
	});

	useEffect(() => {
		getOneIntern(id)
			.then((int) => setIntern(int))
			.catch((error) => console.log(error));
	}, [id]);

	const handleChange = (event) => {
		setIntern({ ...intern, [event.target.name]: event.target.value });
	};
	const onSubmit = (event) => {
		event.preventDefault();
		setAddInternLoading(true);
		if (!emailValidator()) {
			console.log("required");
			return;
		}
		const body = JSON.stringify({
			...intern,
			internshipStart: new Date(intern.internshipStart).toISOString(),
			internshipEnd: new Date(intern.internshipEnd).toISOString(),
		});
		addInternToList(id, body).then(setAddInternLoading(false));
	};

	const emailValidator = () => {
		const regex =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (!intern.email || regex.test(intern.email) === false) {
			return false;
		}
		return true;
	};

	// const dateValidator = () => {
	// 	const startDate = new Date(intern.dateStart);
	// 	const endDate = new Date(intern.dateEnd);
	// 	return endDate.getTime() >= startDate.getTime();
	// };

	return (
		<div>
			<NavLink className="button button-arrow" to="/">
				<img src={arrow} alt="arrow" />
				Back to list{" "}
			</NavLink>
			<div className="container">
				<h3>Edit</h3>
				<form className="intern__form" onSubmit={onSubmit}>
					<label className="intern__form_title" for="name">
						Full name *
					</label>
					<input
						className="intern__form_input"
						type="text"
						name="name"
						value={intern.name}
						onChange={(e) => handleChange(e)}
						required
					/>
					<label className="intern__form_title" for="email">
						Email address *
					</label>
					<input
						className="intern__form_input"
						type="text"
						name="email"
						value={intern.email}
						onChange={(e) => handleChange(e)}
						required
					/>
					<div className="wrapper">
						<label className="intern__form_title" for="internshipStart">
							Internship start *
						</label>
						<label className="intern__form_title" for="internshipEnd">
							Internship end *
						</label>
						<input
							className="intern__form_input intern__form_input-date"
							type="date"
							name="internshipStart"
							value={intern.internshipStart}
							onChange={(e) => handleChange(e)}
						/>
						<input
							className="intern__form_input intern__form_input-date"
							type="date"
							name="internshipEnd"
							value={intern.internshipEnd}
							onChange={(e) => handleChange(e)}
						/>
					</div>

					<button
						className="intern__form_button"
						disabled={addInternLoading}
						type="submit"
						value="Submit"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditIntern;

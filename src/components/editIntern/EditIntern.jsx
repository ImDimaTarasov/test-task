import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
	const onHandleSubmit = (data) => {
		setAddInternLoading(true);
		const body = JSON.stringify({
			...intern,
			internshipStart: new Date(data.internshipStart).toISOString(),
			internshipEnd: new Date(data.internshipEnd).toISOString(),
		});
		addInternToList(id, body).then(setAddInternLoading(false));
	};

	return (
		<Formik
			enableReinitialize
			initialValues={{
				name: intern.name,
				email: intern.email,
				internshipStart: "",
				internshipEnd: "",
			}}
			validationSchema={Yup.object({
				name: Yup.string()
					.min(3, "The minimum length of a name is 3")
					.required("This field is required"),
				email: Yup.string()
					.required("This field is required")
					.email("Invalid email address"),
				internshipStart: Yup.date().required("This field is required"),
				internshipEnd: Yup.date()
					.required("This field is required")
					.min(Yup.ref("internshipStart"), "This date is not correct"),
			})}
			onSubmit={(values) => onHandleSubmit(values)}
		>
			<div>
				<NavLink className="button button-arrow" to="/">
					<img src={arrow} alt="arrow" />
					Back to list{" "}
				</NavLink>
				<div className="container">
					<h3>Edit</h3>
					<Form className="intern__form">
						<div className="intern__form_block">
							<label className="intern__form_title" htmlFor="name">
								Full name *
							</label>
							<Field
								className="intern__form_input"
								type="text"
								name="name"
								value={intern.name}
								onChange={(e) => handleChange(e)}
							/>
							<ErrorMessage className="error" name="name" component="div" />
						</div>
						<div className="intern__form_block">
							<label className="intern__form_title" htmlFor="email">
								Email address *
							</label>
							<Field
								className="intern__form_input"
								type="text"
								name="email"
								value={intern.email}
								onChange={(e) => handleChange(e)}
							/>
							<ErrorMessage className="error" name="email" component="div" />
						</div>
						<div className="wrapper">
							<div className="intern__form_dates">
								<label className="intern__form_title" htmlFor="internshipStart">
									Internship start *
								</label>

								<Field
									className="intern__form_input intern__form_input-date"
									type="date"
									name="internshipStart"
									// value={intern.internshipStart}
									// onChange={(e) => handleChange(e)}
								/>
								<ErrorMessage
									className="error"
									name="internshipStart"
									component="div"
								/>
							</div>
							<div className="intern__form_dates">
								<label className="intern__form_title" htmlFor="internshipEnd">
									Internship end *
								</label>
								<Field
									className="intern__form_input intern__form_input-date"
									type="date"
									name="internshipEnd"
									// value={intern.internshipEnd}
									// onChange={(e) => handleChange(e)}
								/>
								<ErrorMessage
									className="error"
									name="internshipEnd"
									component="div"
								/>
							</div>
						</div>

						<button
							className="intern__form_button"
							disabled={addInternLoading}
							type="submit"
							value="Submit"
						>
							Submit
						</button>
					</Form>
				</div>
			</div>
		</Formik>
	);
};

export default EditIntern;

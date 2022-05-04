import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import InternService from "../../services/InternService";
import setContent from "../../utils/setContent";

import "./internList.scss";

const InternList = () => {
	const { getInterns, process, setProcess } = InternService();
	const [interns, setInterns] = useState([]);
	// const [process, setProcess] = useState("loading");

	useEffect(() => {
		getInterns()
			.then((ints) => setInterns(ints))
			.then(() => setProcess("confirmed"));
	}, []);

	return (
		<article className="container">
			<h3>Participants</h3>
			{setContent(process, View, interns)}
		</article>
	);
};

const View = ({ data }) => {
	return (
		<ul className="interns__list">
			{data.map((u) => (
				<li key={u.id} className="interns__list_item">
					{u.name}
					<NavLink to={`/interns/${u.id}`}>
						<div className="icon">Edit</div>
					</NavLink>
				</li>
			))}
		</ul>
	);
};
export default InternList;

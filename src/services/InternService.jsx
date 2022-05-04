import { useHttp } from "../hooks/hook";

const InternService = () => {
	const { request, process, setProcess } = useHttp();

	const getInterns = async () => {
		return await request("http://localhost:3001/interns");
	};
	const getOneIntern = async (id) => {
		return await request(`http://localhost:3001/interns/${id}`).then((int) =>
			changeInternDates(int)
		);
	};
	const addInternToList = async (id, body) => {
		return await request(`http://localhost:3001/interns/${id}`, "PUT", body);
	};

	const changeInternDates = (intern) => {
		return {
			name: intern.name,
			email: intern.email,
			internshipStart: intern.internshipStart.slice(0, 10),
			internshipEnd: intern.internshipEnd.slice(0, 10),
		};
	};
	return {
		getInterns,
		getOneIntern,
		addInternToList,
		process,
		setProcess
	};
};
export default InternService;

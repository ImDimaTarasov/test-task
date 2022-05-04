import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMesage/ErrorMesage";

const setContent = (process, Component, data) => {
	switch (process) {
		case "loading":
			return <Spinner />;
		case "confirmed":
			return <Component data={data} />;
		case "error":
			return <ErrorMessage />;
		default:
			throw new Error("Unexpected process state");
	}
};

export default setContent;
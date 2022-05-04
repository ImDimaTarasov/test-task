import "./App.scss";
import EditIntern from "../editIntern/EditIntern";
import InternList from "../internList/InternList";
import { Routes, Route } from "react-router-dom";
import Logo from '../../logo.svg';

function App() {
  return (
    <div className="App">
      <img className="App__logo" src={Logo} alt="logo" />
      <Routes>
        <Route path="/interns/:id" exact element={<EditIntern />} />
        <Route path="/" element={<InternList />} />
      </Routes>
    </div>
  );
}

export default App;

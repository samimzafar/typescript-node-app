import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ShowTutorialList from "./Pages/ShowTutorialList";
import CreateTutorial from "./Pages/CreateTutorial";
import UpdateTutorial from "./Pages/UpdateTutorial";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<ShowTutorialList />} />
          <Route path="/create-tutorial" element={<CreateTutorial />} />
          <Route path="/edit-tutorial/:id" element={<UpdateTutorial />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

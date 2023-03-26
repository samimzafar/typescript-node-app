import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import CreateTutorial from "./components/CreateTutorial";
import ShowTutorialList from "./components/ShowTutorialList";
import UpdateTutorial from "./components/UpdateTutorial";

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

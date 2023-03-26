import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowTutorialList from "../pages/ShowTutorialList";
import CreateTutorial from "../pages/CreateTutorial";
import UpdateTutorial from "../pages/UpdateTutorial";
const Routing = () => {
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

export default Routing;

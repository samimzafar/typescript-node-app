import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import TutorialCard from "../components/TutorialCard";
import { getTutorialsApi } from "../services/api";

function ShowTutorialList() {
  const [tutorial, setTutorial] = useState([]);

  const FetchTutorials = async () => {
    try {
      const response = await await getTutorialsApi();
      setTutorial(response.data);
    } catch (error) {
      console.log("Error in ShowTutorialList!", error);
    }
  };

  useEffect(() => {
    FetchTutorials();
  }, []);

  const tutorialList =
    tutorial.length === 0
      ? "there is no tutorial record!"
      : tutorial.map((tutorial, k) => (
          <TutorialCard tutorial={tutorial} key={k} />
        ));

  return (
    <div className="ShowTutorialList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Tutorial List</h2>
          </div>

          <div className="col-md-11">
            <Link
              to="/create-tutorial"
              className="btn btn-outline-warning float-right"
            >
              + Add New Tutorial
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className="list">{tutorialList}</div>
      </div>
    </div>
  );
}

export default ShowTutorialList;

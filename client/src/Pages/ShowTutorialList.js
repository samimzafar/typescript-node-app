import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import TutorialCard from "../components/TutorialCard";
import { deleteTutorialByIDApi, getTutorialsApi } from "../services/api";
import { BASE_URL } from "../utils";
import axios from "axios";

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
  const onDeleteClick = async (tutId) => {
    // axios
    //   .delete(`${BASE_URL}/tutorials/${tutId}`)
    //   .then((res) => {
    //     setTutorial(preState => preState.filter(({ id }) => id !== +tutId));
    //   })
    //   .catch((err) => {
    //     console.log("Error form ShowTutorialDetails");
    //   });

    try {
      const response = await deleteTutorialByIDApi(tutId);
      console.log(
        "🚀 ~ file: ShowTutorialList.js:36 ~ onDeleteClick ~ response:",
        response
      );
      setTutorial((preState) => preState.filter(({ id }) => id !== +tutId));
    } catch (error) {
      console.log("Error form ShowTutorialDetails");
    }
  };
  const tutorialList =
    tutorial.length === 0
      ? "there is no tutorial record!"
      : tutorial.map((tutorial, k) => (
          <TutorialCard
            tutorial={tutorial}
            key={k}
            handleDelete={onDeleteClick}
          />
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

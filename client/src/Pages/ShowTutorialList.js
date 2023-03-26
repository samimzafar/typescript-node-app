import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import TutorialCard from "../components/TutorialCard";
import { BASE_URL } from "../utils";

function ShowTutorialList() {
  const [tutorial, setTutorial] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/tutorials`)
      .then((res) => {
        setTutorial(res.data.data);
      })
      .catch((err) => {
        console.log("Error from ShowTutorialList");
      });
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

import axios from "axios";
import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "../App.css";
import { BASE_URL } from "../utils";

const TutorialCard = (props) => {
  const tutorial = props.tutorial;
  return (
    <div className="card-container">
      <img
        src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
        alt="Tutorials"
        height={220}
      />
      <div className="desc">
        <h2>
          <Link to={`/show-tutorial/${tutorial.id}`}>{tutorial.title}</Link>
        </h2>
        <p>{tutorial.description}</p>
      </div>
      <div className="row">
        <div className="col-md-6 m-auto">
          <button
            type="button"
            className="btn btn-outline-danger btn-sm btn-block"
            onClick={() => {
              props.handleDelete(tutorial.id);
            }}
          >
            Delete
          </button>
        </div>
        <div className="col-md-6 m-auto">
          <Link
            to={`/edit-tutorial/${tutorial.id}`}
            className="btn btn-outline-info btn-sm btn-block"
          >
            Edit Tutorial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorialCard;

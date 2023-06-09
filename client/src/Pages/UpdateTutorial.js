import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { BASE_URL } from "../utils";
import { getTutorialByIDApi } from "../services/api";

function UpdateTutorial(props) {
  const [tutorial, setTutorial] = useState({
    title: "",
    description: "",
    published: true,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const FetchTutorialByID = async () => {
    try {
      const response = await getTutorialByIDApi();
      setTutorial({
        title: response.data?.title,
        description: response.data?.description,
        published: response.data?.published,
      });
    } catch (error) {
      console.log("Error in UpdateTutorial Info!", error);
    }
  };

  useEffect(() => {
    FetchTutorialByID();
  }, [id]);

  const onChange = (e) => {
    setTutorial({ ...tutorial, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: tutorial.title,
      description: tutorial.description,
      published: tutorial.published,
    };

    axios
      .put(`http://localhost:4000/api/tutorials/${id}`, data)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log("Error in UpdateTutorialInfo!");
      });
  };

  return (
    <div className="UpdateTutorialInfo">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show Tutorial List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Tutorial</h1>
            <p className="lead text-center">Update Tutorial's Info</p>
          </div>
        </div>

        <div className="col-md-8 m-auto">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Title of the Tutorial"
                name="title"
                className="form-control"
                value={tutorial.title}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                placeholder="Description of the Tutorial"
                name="description"
                className="form-control"
                value={tutorial.description}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="published_date">Published Date</label>
              <input
                type="text"
                name="published"
                className="form-control"
                value={tutorial.published}
                onChange={onChange}
              />
            </div>
            <br />
            <button
              type="submit"
              className="btn btn-outline-info btn-lg btn-block"
            >
              Update Tutorial
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateTutorial;

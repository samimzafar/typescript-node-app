import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createTutorialsApi } from "../services/api";

const CreateTutorial = (props) => {
  // Define the state with useState hook
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState({
    title: "",
    description: "",
    published: true,
  });

  const onChange = (e) => {
    setTutorial({ ...tutorial, [e.target.name]: e.target.value });
  };
  const handleForm = async () => {
    try {
      await createTutorialsApi(tutorial);
      setTutorial({
        title: "",
        isbn: "",
        author: "",
        description: "",
        published_date: "",
        publisher: "",
      });
      navigate("/");
    } catch (error) {
      console.log("Error in CreateTutorial!", error);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    handleForm();
  };

  return (
    <div className="CreateTutorial">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show Tutorial List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add CreateTutorial</h1>
            <p className="lead text-center">Create new CreateTutorial</p>

            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
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
                <input
                  type="text"
                  placeholder="Describe this tutorial"
                  name="description"
                  className="form-control"
                  value={tutorial.description}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="published"
                  className="form-control"
                  value={tutorial.published}
                  onChange={onChange}
                />
              </div>

              <input
                type="submit"
                className="btn btn-outline-warning btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTutorial;

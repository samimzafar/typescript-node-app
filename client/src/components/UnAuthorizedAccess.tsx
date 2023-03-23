import React from "react";
import { AiFillStop } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useHistory } from "react-router";

interface IProps {
  message: string;
}

const UnauthorizedAccess = ({ message }: IProps) => {
  const history = useHistory();
  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="text-center mt-4">
        <AiFillStop size={30} />
        <p className="mt-2 mb-4">{message}</p>
        <button className="site-btn" onClick={() => history.push(`/home`)}>
          <BiArrowBack className="me-2" /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;

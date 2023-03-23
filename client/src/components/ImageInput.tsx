import React from "react";
import { Col, Row, Form, Spinner } from "react-bootstrap";
import { AiOutlineQuestion } from "react-icons/ai";
import { ImFileEmpty } from "react-icons/im";
import { TiTimes } from "react-icons/ti";
import noImage from "../assets/images/dummyImages/noImage.png";
import SuccessSVG from "./SuccessSVG";

interface IProps {
  companyDocuments: any;
  onRemoveImage: any;
  onClick?: any;
  onChange: any;
  fieldName: string;
  label: string;
  required: boolean;
  imageError: any;
  isUploading: any;
}

const ImageInput = ({
  companyDocuments,
  onRemoveImage,
  onClick,
  isUploading,
  onChange,
  label,
  required,
  fieldName,
  imageError,
}: IProps) => {
  const { Control } = Form;
  return (
    <>
      <Row className="tg-custom-img-upload-row">
        <Col lg={9} md={8} sm={8} xs={8} className="ps-0 pe-0">
          <div className="d-flex flex-column justify-content-between align-items-start upload-div">
            <label className="d-flex">
              {label}
              {required && <span className="required-field">*</span>}
            </label>
            <Control
              name={fieldName}
              id="uploadImages"
              type="file"
              placeholder="Upload Images"
              className="shadow-none"
              onChange={(e) => onChange(e, fieldName)}
              onClick={onClick && onClick}
            />
          </div>
        </Col>

        <Col
          lg={3}
          md={4}
          sm={4}
          xs={4}
          className="ps-0 pe-0 d-flex justify-content-end align-items-center"
        >
          {isUploading[`${fieldName}`] ? (
            <div className="emptymark d-flex justify-content-center align-items-center">
              <Spinner animation="border" size="sm" />
            </div>
          ) : (
            companyDocuments[`${fieldName}`] && <SuccessSVG className="m-0" />
          )}
        </Col>
        {companyDocuments[`${fieldName}`] && (
          <Col lg={12} className="ps-0 pe-0">
            <div className="uploaded-img-div d-flex justify-content-between align-items-center">
              {companyDocuments[`${fieldName}`] ? (
                <>
                  <a>{label} uploaded!</a>
                  <span onClick={() => onRemoveImage(fieldName)}>
                    <TiTimes size={16} />
                  </span>
                </>
              ) : (
                <>
                  <a> No document uploaded!</a>
                </>
              )}
            </div>
          </Col>
        )}
      </Row>
      <p className="validation-error-alert">
        {imageError[`${fieldName}`] && (
          <Form.Text className="text-danger">
            {imageError[`${fieldName}`]}
          </Form.Text>
        )}
      </p>
    </>
  );
};

export default ImageInput;

import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";

interface ISelectProps {
  control: any;
  name: string;
  errors: any;
  label: string;
  rules: {};
  placeHolder: string;
  onBlur?: (e: any) => void;
  options: any;
  customStyle: any;
  errorMessage: string;
}

const SelectDropDown = ({
  name,
  placeHolder,
  rules,
  control,
  errors,
  onBlur,
  options,
  customStyle,
  label,
  errorMessage,
}: ISelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>{label}</Form.Label>
            <Select
              {...field}
              options={options}
              placeholder={placeHolder}
              menuPlacement="top"
              styles={customStyle}
              onBlur={
                onBlur &&
                (() => {
                  onBlur(field.value);
                })
              }
            />
            <p className="validation-error-alert">
              {errors[name] && (
                <Form.Text className="text-danger">{errorMessage}</Form.Text>
              )}
            </p>
          </Form.Group>
        </>
      )}
    />
  );
};

export default SelectDropDown;

import React from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { Controller } from "react-hook-form";

interface IFormInputs {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  rules: {};
  placeHolder: string;
  control: any;
  isdisabled?: boolean;
  errors: any;
  onInput?: (e: any) => void;
  errorMessage: string;
  customClass?: string;
}

const AddProductFormInputs = ({
  name,
  rules,
  control,
  label,
  placeHolder,
  isdisabled,
  type,
  required,
  errors,
  errorMessage,
  onInput,
  customClass,
}: IFormInputs) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <FloatingLabel
              controlId="floatingInput"
              label={label}
              className={`mb-3 ${required && "required"} inputfield-style ${
                customClass && customClass
              }`}
            >
              <Form.Control
                {...field}
                className={`shadow-none ${errors[name] && "error-input"}`}
                onInput={
                  onInput
                    ? (e: any) => {
                        e.target.value = onInput(e);
                      }
                    : undefined
                }
                disabled={isdisabled ? isdisabled : undefined}
                onWheel={(e: any) => e.target.blur()}
                placeholder={placeHolder}
                type={type}
              />
              <p className="validation-error-alert">
                {errors[name] && (
                  <Form.Text className="text-danger">{errorMessage}</Form.Text>
                )}
              </p>
            </FloatingLabel>
          </>
        )}
      />
    </>
  );
};

export default AddProductFormInputs;

import React from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { Controller } from "react-hook-form";

interface IFormInputs {
  name: string;
  label: string;
  type: string;
  rules: {};
  placeHolder: string;
  control: any;
  errors: any;
  onInput?: (e: any) => void;
  errorMessage: string;
}

const FloatingTextArea = ({
  name,
  rules,
  control,
  label,
  placeHolder,
  type,
  errors,
  errorMessage,
  onInput,
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
              label={null}
              className="mb-3"
            >
              <Form.Control
                as={"textarea"}
                {...field}
                className="shadow-none"
                onInput={
                  onInput
                    ? (e: any) => {
                        e.target.value = onInput(e);
                      }
                    : undefined
                }
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

export default FloatingTextArea;

import React from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { Controller } from "react-hook-form";

interface IFormInputs {
  name: string;
  label: string;
  type: string;
  rules?: {};
  placeHolder: string;
  required?: boolean;
  control: any;
  isDisabled?: boolean;
  errors: any;
  onInput?: (e: any) => void;
  keyPressed?: (e: any) => void;
  errorMessage: string;
}

const RegistrationFormInput = ({
  name,
  rules,
  control,
  label,
  placeHolder,
  required,
  type,
  isDisabled,
  keyPressed,
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
              label={label}
              className={`mb-3 ${required && "required"}`}
            >
              <Form.Control
                {...field}
                className={`shadow-none ${errors[name] && "error-input"}`}
                disabled={isDisabled ? isDisabled : undefined}
                onInput={
                  onInput
                    ? (e: any) => {
                        e.target.value = onInput(e);
                      }
                    : undefined
                }
                onKeyPress={keyPressed ? keyPressed : undefined}
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

export default RegistrationFormInput;

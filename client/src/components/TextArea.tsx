import React from "react";
import { Form, FormGroup } from "react-bootstrap";
import { Controller } from "react-hook-form";

interface IFormInputs {
  name: string;
  label: string;
  type: string;
  rules: {};
  placeHolder: string;
  control: any;
  errors: any;
  isDisabled?: boolean;
  onInput?: (e: any) => void;
  errorMessage: string;
}

const TextArea = ({
  name,
  rules,
  control,
  label,
  placeHolder,
  type,
  isDisabled,
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
            <FormGroup controlId="" className="mb-3">
              {label !== "" ? <Form.Label>{label}</Form.Label> : null}
              <Form.Control
                as={"textarea"}
                {...field}
                className="shadow-none tg-textarea"
                disabled={isDisabled ? isDisabled : undefined}
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
            </FormGroup>
          </>
        )}
      />
    </>
  );
};

export default TextArea;

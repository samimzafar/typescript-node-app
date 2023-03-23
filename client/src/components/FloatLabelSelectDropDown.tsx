import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { Label } from "../layouts/MainLayout/MainLayout.constants";
import Select, { components, MenuPlacement } from "react-select";

export const Control = (props: any) => {
  return (
    <>
      <Label
        isFloating={props.isFocused || props.hasValue}
        className="d-flex justify-content-center align-items-center zIndex1"
      >
        {props.selectProps["aria-label"]}
      </Label>
      <components.Control {...props} />
    </>
  );
};

interface ISelectProps {
  control: any;
  name: string;
  errors: any;
  label: string | undefined;
  required?: boolean;
  rules?: {};
  placeHolder: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
  options: any;
  customStyle: any;
  errorMessage: string;
  menuPlacement?: MenuPlacement;
}

const FloatLabelSelectDropDown = ({
  name,
  placeHolder,
  rules,
  menuPlacement,
  control,
  required,
  errors,
  onChange,
  options,
  customStyle,
  disabled,
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
          <Select
            {...field}
            components={{ Control }}
            options={options}
            styles={customStyle}
            isDisabled={disabled ? disabled : undefined}
            placeholder={placeHolder}
            aria-label={label}
            menuPlacement={menuPlacement ? menuPlacement : undefined}
            className={`tg-select-react ${
              required && "tg-select-react-asteric"
            } ${errors[name] && "error-input"}`}
            classNamePrefix="tg-select"
            onChange={onChange ? onChange : undefined}
          />
          <p className="validation-error-alert">
            {errors[name] && (
              <Form.Text className="text-danger">{errorMessage}</Form.Text>
            )}
          </p>
        </>
      )}
    />
  );
};

export default FloatLabelSelectDropDown;

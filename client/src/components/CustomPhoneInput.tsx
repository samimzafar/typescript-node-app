import React from "react";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { FloatingLabel, Form } from "react-bootstrap";

interface IProps {
  name: string;
  label: string;
  rules?: {};
  control: any;
  errors: any;
  errorMessage: string;
  international?: boolean;
  countries?: any[];
  defaultCountry?: any;
  required?: boolean;
}

const CustomPhoneInput = ({
  name,
  rules,
  control,
  label,
  errors,
  international,
  errorMessage,
  defaultCountry,
  countries,
  required,
}: IProps) => {
  return (
    <>
      <FloatingLabel
        controlId="floatingInput"
        label={label}
        className={`mb-3 ${required && "required"}`}
      >
        <PhoneInputWithCountry
          name={name}
          rules={rules}
          international={true}
          addInternationalOption={international ? international : false}
          withCountryCallingCode
          defaultCountry={defaultCountry && defaultCountry}
          focusInputOnCountrySelection
          countryCallingCodeEditable
          className={`tg-phone-input form-control ${
            errors.phone && "error-input"
          }`}
          control={control}
          countries={countries && countries}
        />
        <p className="validation-error-alert">
          {errors.phone && (
            <Form.Text className="text-danger">{errorMessage}</Form.Text>
          )}
        </p>
      </FloatingLabel>
    </>
  );
};

export default CustomPhoneInput;

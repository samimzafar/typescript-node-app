import { EventHandler } from "react";
import styled from "styled-components";
import { THEME_COLORS } from "../../constants";

export const ACTIONS = {
  SET_LOADING: "setIsLoading",
  SET_USER: "setUserData",
  LOGOUT_USER: "logout",
};
interface IRegistrationFields {
  name: string;
  label: string;
  type: string;
  placeHolder: string;
  required?: boolean;
  rules: {};
  errorMessage: string;
  onInput?: (e: any) => void;
}

export const LoginFieldConstants: IRegistrationFields[] = [
  {
    name: "email",
    label: "Email",
    type: "text",
    rules: {
      required: true,
    },
    required: true,
    placeHolder: "Email",
    errorMessage: "A valid Email is required",
    onInput: (e) => e.target.value.toString().trim(),
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    placeHolder: "Password",
    rules: {
      required: true,
    },
    errorMessage: "Password is required",
    onInput: (e) => e.target.value.toString().trim(),
  },
];

export const companyType: string[] = [
  "Farmer",
  "Processor",
  "Importer",
  "Exporter",
];

export const Label = styled.label<{ isFloating?: boolean }>`
  z-index: 2;
  opacity: ${(props) => (props.isFloating ? `0.65` : `1`)};
  transform: ${(props) =>
    props.isFloating
      ? `scale(0.85) translateY(-0.5rem) translateX(0.15rem)`
      : `0`};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  padding: 1rem 0.75rem;
  pointer-events: none;
  border: 1px solid transparent;
  transform-origin: 0 0;
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
`;
export const customSelectStyles = {
  option: (provided: any, state: any) => {
    const selectedOptionColor = THEME_COLORS.white;
    const selectedOptionBackgroundColor = THEME_COLORS.secondary;
    const selectedOptionColorLight = THEME_COLORS.black;
    const selectedOptionBackgroundColorLight = THEME_COLORS.secondary_light;

    return {
      ...provided,
      height: 35,
      color: state.isSelected && selectedOptionColor,
      backgroundColor: state.isSelected && selectedOptionBackgroundColor,
      "&:hover": {
        color: state.isSelected
          ? selectedOptionColor
          : selectedOptionColorLight,
        backgroundColor: state.isSelected
          ? selectedOptionBackgroundColor
          : selectedOptionBackgroundColorLight,
      },
      "&:focus": {
        color: state.isSelected
          ? selectedOptionColor
          : selectedOptionColorLight,
        backgroundColor: state.isSelected
          ? selectedOptionBackgroundColor
          : selectedOptionBackgroundColorLight,
      },
      "&:active": {
        color: state.isSelected
          ? selectedOptionColor
          : selectedOptionColorLight,
        backgroundColor: state.isSelected
          ? selectedOptionBackgroundColor
          : selectedOptionBackgroundColorLight,
      },
    };
  },
};

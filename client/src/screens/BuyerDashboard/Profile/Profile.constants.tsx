export const ProfileSettingsFields = [
  {
    name: "email",
    type: "text",
    rules: { required: true },
    errorMessage: "Email is required",
    label: "Email",
    placeHolder: "Email",
    disabled: true,
    required: true,
  },
  {
    name: "username",
    type: "text",
    rules: { required: true },
    errorMessage: "Username is required",
    label: "User Name",
    placeHolder: "User Name",
    disabled: true,
    required: true,
  },
  {
    name: "name",
    type: "text",
    rules: { required: true },
    errorMessage: "Name is required",
    label: "Name",
    placeHolder: "Name",
    disabled: false,
    required: true,
  },
];

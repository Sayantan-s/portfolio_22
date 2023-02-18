import * as Yup from "yup";

export const loginSignUp = Yup.object({
  email: Yup.string()
    .email("Enter a proper email")
    .required("Email shouldn't be empty"),
});

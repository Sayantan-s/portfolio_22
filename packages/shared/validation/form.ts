import Yup from "yup";

export const loginSignUp = Yup.object({
  email: Yup.string().email("email shouldn't be empty").required(),
});

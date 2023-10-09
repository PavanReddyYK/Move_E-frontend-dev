import * as yup from "yup";

export const ForgotPasswordSchema = yup.object({
  email: yup.string().email("invalid email").required("enter your email"),
});

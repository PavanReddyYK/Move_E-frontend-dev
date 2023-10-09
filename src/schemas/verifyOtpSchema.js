import * as yup from "yup";

export const verifyOtpSchema = yup.object({
  email: yup.string().email("invalid email").required("enter your email"),
  otp: yup.number().min(4, "Invalid OTP").required("enter OTP"),
  new_password: yup.string(),
  confirm_new_password: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "password did not match").required('confirm new password'),
});

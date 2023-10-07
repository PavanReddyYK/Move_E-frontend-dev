import * as Yup from "yup";

export const SignUpSchema = Yup.object({
  name: Yup.string()
    .min(4, "Name should be minimum of 4 characters")
    .max(30, "Name can be maximum of 30 characters")
    .required("please enter your name"),
  email: Yup.string()
    .email("email must be a valid")
    .required("please enter your email"),
  age: Yup.number("must be a number")
    .required("please enter your age"),
  state: Yup.string("must be a string")
    .required("please enter state"),
  country: Yup.string()
    .required("please enter country"),
  password: Yup.string()
    .min(4, "password should minimum of 4 characters")
    .required("please enter password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "password did not match")
    .required("please enter password again"),
});

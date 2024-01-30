import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { ForgotPasswordSchema } from "../../schemas/ForgotPasswordSchema";

const initialValues = {
  email: "",
};

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: ForgotPasswordSchema,
      onSubmit: (values, action) => {
        axios
          .post(
            `${process.env.REACT_APP_DEV_BASE_URL}/user/forgotPassword`,
            {
              email: values.email,
            }
          )
          .then((res) => {
            console.log(res.data.message);
            navigate(`/auth/signIn/verifyOtp/${values.email}`);
          })
          .catch((err) => {
            console.error(
              "Response Error!!!",
              err.response.statusText,
              err.response.data
            );
          });
        action.resetForm();
      },
    });

  return (
    <div
      className="container d-flex justify-content-center align-items-center min-vh-100"
      style={{ background: "linear-gradient(to bottom, #cfe9e91a, #f0f0f84d)" }}
    >
      <div className="p-4 rounded-4" style={{ backgroundColor: "#eaebedb8" }}>
        <div className="mb-3" style={{ minWidth: "300px" }}>
          <div className="text-center">
            <h4 className="mb-3">Forgot Password</h4>
          </div>
          <form onSubmit={handleSubmit}>
            {/* ---------------------------------EMAIL-------------------- */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label d-block h5">
                email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                autoComplete="off"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="enter email"
              />
              {errors.email && touched.email ? (
                <h6 className="form-error text-danger mb-0">{errors.email}</h6>
              ) : null}
            </div>
            <div className="mb-3 d-grid gap-2">
              <div className="d-flex flex-column text-center h6">
                we will send otp to this account
                <button
                  type="submit"
                  className="btn btn-outline-dark mt-2 font-weight-normal"
                >
                  Send OTP
                </button>
              </div>
            </div>
          </form>
          <div className="">
            <div className="d-flex justify-content-center align-item-center h6">
              <Link to="/auth/signIn">Back to SignIn??</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;

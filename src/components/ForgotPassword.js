import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { ForgotPasswordSchema } from "../schemas/ForgotPasswordSchema";

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
            `http://localhost:${process.env.REACT_APP_DEV_BACKEND_PORT}/v1/user/forgotPassword`,
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
      style={{ background: "linear-gradient(to bottom, #f8ffff, #f0f0f8)" }}
    >
      <div className="p-4" style={{ backgroundColor: "#bccaf136" }}>
        <div className="mb-3" style={{ minWidth: "300px" }}>
          <div className="text-center">
            <h4 className="mb-3">Forgot Password</h4>
          </div>
          <form onSubmit={handleSubmit}>
            {/* ---------------------------------EMAIL-------------------- */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label d-block">
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
              <div className="d-flex flex-column text-center">
                we will send otp to this account
                <button
                  type="submit"
                  className="btn btn-outline-secondary mt-2"
                >
                  Send OTP
                </button>
              </div>
            </div>
          </form>
          <div className="">
            <div className="d-flex justify-content-center align-item-center">
              <Link to="/">Back to SignIn??</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;

import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";

import { verifyOtpSchema } from "../schemas/verifyOtpSchema";


const VerifyOtp = () => {
  const {email} = useParams()
  const initialValues = {
    email: email,
    otp: "",
    new_password: "",
    confirm_new_password: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: verifyOtpSchema,
      onSubmit: (values, action) => {
        axios
          .post(
            `http://localhost:${process.env.REACT_APP_DEV_BACKEND_PORT}/v1/user/verifyOtp`,
            {
              email: values.email,
              otp: values.otp,
              new_password: values.new_password,
            }
          )
          .then((res) => {
            console.log(res.data.message);
            if (res.status === 200) {
              sessionStorage.setItem("token", res.data.token);
              console.log("token", res.data.token);
            } else {
              console.error("Login failed:", res.data.message);
            }
          })
          .catch((err) => {
            console.error("Axios error::::", err.message);
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
            <h4 className="mb-3">Verify OTP"</h4>
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
            {/* ---------------------------------OTP-------------------- */}
            <div className="mb-3">
              <label htmlFor="otp" className="form-label d-block">
                email
              </label>
              <input
                type="text"
                className="form-control"
                id="otp"
                name="otp"
                autoComplete="off"
                value={values.otp}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="enter OTP"
              />
              {errors.otp && touched.otp ? (
                <h6 className="form-error text-danger mb-0">{errors.otp}</h6>
              ) : null}
            </div>
            {/* ---------------------------------PASSWORD-------------------- */}
            <div className="mb-3">
              <label htmlFor="new_password" className="form-label">
                password
              </label>
              <input
                type="password"
                className="form-control"
                id="new_password"
                name="new_password"
                autoComplete="off"
                value={values.new_password}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="enter new password"
              />
              {errors.new_password && touched.new_password ? (
                <h6 className="form-error text-danger mb-0">
                  {errors.new_password}
                </h6>
              ) : null}
            </div>
            {/* ---------------------------------CONFIRM_PASSWORD-------------------- */}
            <div className="mb-3">
              <label htmlFor="confirm_new_password" className="form-label">
                password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirm_new_password"
                name="confirm_new_password"
                autoComplete="off"
                value={values.confirm_new_password}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="confirm new password"
              />
              {errors.confirm_new_password && touched.confirm_new_password ? (
                <h6 className="form-error text-danger mb-0">
                  {errors.confirm_new_password}
                </h6>
              ) : null}
            </div>
            <div className="mb-3 d-grid gap-2">
              <button type="submit" className="btn btn-outline-success">
                SignIn
              </button>
            </div>
            <div className="mb-3"></div>
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
export default VerifyOtp;

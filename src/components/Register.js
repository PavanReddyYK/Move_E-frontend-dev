import React from "react";
import { useFormik } from "formik";
import { SignUpSchema } from "../schemas/SignUpSchema";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  age: "",
  state: "",
  country: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: SignUpSchema,
      onSubmit: async (values, action) => {
        const payload = {
          name: values.name,
          email: values.email,
          age: values.age,
          state: values.state,
          country: values.country,
          password: values.password,
        };
        await axios
          .post(
            `http://localhost:${process.env.REACT_APP_DEV_BACKEND_PORT}/v1/user/registerUser`,
            payload
          )
          .then((res) => {
            console.log("🚀Register.js:40 ~ .then ~ res:", res.data);
          })
          .catch((err) => {
            console.log("Error Response:---", err.response);
          });
        // action.resetForm();
      },
    });
  const SignUpGoogle = async () => {
    await axios
      .post(
        `http://localhost:${process.env.REACT_APP_DEV_BACKEND_PORT}/v1/user/googleSignUp`
      )
      .then((res) => {
        window.location.href = `${res.data}`;
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };
  const handleSignInClick = () => {
    navigate("/");
  };
  return (
    <div className="container">
      <div className=" d-flex align-items-center justify-content-center min-vh-100 border">
        <div className="border p-4 m-4" style={{ minWidth: "360px" }}>
          <div className="mb-4 text-center">
            <h4>Registration</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-wrap">
              {/* ---------------------------------NAME-------------------- */}
              <div
                className="input-block mb-2"
                style={{ width: "350px", margin: "auto" }}
              >
                <label htmlFor="name" className="form-label mb-0">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  autoComplete="off"
                  className="form-control"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name ? (
                  <p className="form-error text-danger mb-0">{errors.name}</p>
                ) : null}
              </div>
              {/* ------------------------------EMAIL-------------------- */}
              <div
                className="input-block mb-2"
                style={{ width: "350px", margin: "auto" }}
              >
                <label htmlFor="email" className="form-label mb-0">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  autoComplete="off"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.email && touched.email ? (
                  <p className="form-error text-danger mb-0">{errors.email}</p>
                ) : null}
              </div>
              {/* ------------------------------AGE-------------------- */}
              <div
                className="input-block mb-2"
                style={{ width: "350px", margin: "auto" }}
              >
                <label htmlFor="age" className="form-label mb-0">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  placeholder="Age"
                  className="form-control"
                  autoComplete="off"
                  value={values.age}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.age && touched.age ? (
                  <p className="form-error text-danger mb-0">{errors.age}</p>
                ) : null}
              </div>
              {/* ------------------------------STATE-------------------- */}
              <div
                className="input-block mb-2"
                style={{ width: "350px", margin: "auto" }}
              >
                <label htmlFor="state" className="form-label mb-0">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                  className="form-control"
                  autoComplete="off"
                  value={values.state}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.state && touched.state ? (
                  <p className="form-error text-danger mb-0">{errors.state}</p>
                ) : null}
              </div>
              {/* ------------------------------COUNTRY-------------------- */}
              <div
                className="input-block mb-2"
                style={{ width: "350px", margin: "auto" }}
              >
                <label htmlFor="country" className="form-label mb-0">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Country"
                  className="form-control"
                  autoComplete="off"
                  value={values.country}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.country && touched.country ? (
                  <p className="form-error text-danger mb-0">
                    {errors.country}
                  </p>
                ) : null}
              </div>
              {/* ------------------------------PASSWORD-------------------- */}
              <div
                className="input-block mb-2"
                style={{ width: "350px", margin: "auto" }}
              >
                <label htmlFor="password" className="form-label mb-0">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  autoComplete="off"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.password && touched.password ? (
                  <p className="form-error text-danger mb-0">
                    {errors.password}
                  </p>
                ) : null}
              </div>
              {/* ----------------------------CONFIRM-PASSWORD-------------------- */}
              <div
                className="input-block mb-2"
                style={{ width: "350px", margin: "auto" }}
              >
                <label htmlFor="confirmPassword" className="form-label mb-0">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="form-control"
                  autoComplete="off"
                  value={values.confirmPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <p className="form-error text-danger mb-0">
                    {errors.confirmPassword}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="d-grid mt-4 align-items-center  justify-content-center ">
              <button type="submit" className="btn btn-outline-secondary mb-2">
                Submit
              </button>
              <>
                Already have an account?{" "}
                <a
                  onClick={handleSignInClick}
                  className="text-decoration-none text-center"
                >
                  <>
                    <strong>SingnIn here</strong>
                  </>
                </a>
              </>
              <>
                <div className="container d-flex justify-content-center align-item-center">
                  <h5>SignIn through google account??</h5>{" "}
                  <button type="submit" onClick={SignUpGoogle}>
                    SignIn{" "}
                  </button>
                </div>
              </>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

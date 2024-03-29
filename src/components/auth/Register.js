import React from "react";
import { useFormik } from "formik";
import { SignUpSchema } from "../../schemas/SignUpSchema";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { loadWatchList, setUser } from "../../store/slice";

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
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
            `${process.env.REACT_APP_DEV_BASE_URL}/user/registerUser`,
            payload
          )
          .then((res) => {
            console.log("🚀Register.js:40 ~ .then ~ res:", res.data);
            sessionStorage.setItem('token',res.data.token)
            dispatch(setUser(res.data.user))
            dispatch(loadWatchList())
            navigate(`/${res.data.token}`);
          })
          .catch((err) => {
            console.log("Error Response:---", err.response);
          });
        action.resetForm();
      },
    });
  const SignUpGoogle = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_DEV_BASE_URL}/user/googleSignUp`
      )
      .then((res) => {
        window.location.href = `${res.data}`;
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <div
      className="container"
      style={{ background: "linear-gradient(to bottom, #cfe9e91a, #f0f0f84d)" }}
    >
      <div className=" d-flex align-items-center justify-content-center min-vh-100">
        <div
          className=" p-4 m-2 rounded-4"
          style={{ minWidth: "200px", backgroundColor: "#eaebedb8"}}
        >
          <div className="mb-4 text-center">
            <h3>Register to our Application</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-wrap">
              {/* ---------------------------------NAME-------------------- */}
              <div
                className="input-block mb-2"
                style={{ width: "350px", margin: "auto" }}
              >
                <label htmlFor="name" className="form-label mb-0 h5">
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
                <label htmlFor="email" className="form-label mb-0 h5">
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
                <label htmlFor="age" className="form-label mb-0 h5">
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
                <label htmlFor="state" className="form-label mb-0 h5">
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
                <label htmlFor="country" className="form-label mb-0 h5">
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
                <label htmlFor="password" className="form-label mb-0 h5">
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
                <label htmlFor="confirmPassword" className="form-label mb-0 h5">
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
            <div className="d-grid mt-2 align-items-center  justify-content-center ">
              <button
                type="submit"
                style={{ width: "250px" }}
                className="btn btn-outline-dark mb-2"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="d-grid align-items-center justify-content-center mb-0">
            <div className="text-center h6">
              Already have an account?{" "}
              <Link to="/auth/signIn" className="">
                SignIn here
              </Link>
              <div className="mb-1 h6">or</div>
            </div>
            <div className="">
              <div className=" d-flex justify-content-center align-item-center">
                <button
                  className="btn btn-outline-dark"
                  type="submit"
                  onClick={SignUpGoogle}
                  style={{ width: "250px", color: "" }}
                >
                  <FcGoogle />
                  oogle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { SignInSchema } from "../../schemas/SignInSchema";
import { loadWatchList, setUser } from "../../store/slice";
// import useFullPageLoader from "../../helper/useFullPageLoader";

const initialValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
// const [loader, showLoader, hideLoader] = useFullPageLoader()

const sweetAlertHandler = (title,iconStatus)=>{
  const mySwal = withReactContent(Swal)
  mySwal.fire({
    title: title,
    icon: iconStatus,
  })
}

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: SignInSchema,
      onSubmit: (values, action) => {
        // showLoader()
        axios
          .post(
            `${process.env.REACT_APP_DEV_BASE_URL}/user/logInUser`,
            {
              email: values.email,
              password: values.password,
            }
          )
          .then((res) => {
            console.log(res.data);
            sessionStorage.setItem('token', res.data.token)
            dispatch(setUser(res.data.user))
            dispatch(loadWatchList())
            // hideLoader()
            sweetAlertHandler("SignIn Successful","success")

            navigate(`/${res.data.token}`);
          })
          .catch((err) => {
            console.error(
              "Response Error!!!",
              err
            );
            sweetAlertHandler("SignIn failed","error")
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
        console.error("Error:", err.message);
      });
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center min-vh-100"
      style={{ background: "linear-gradient(to bottom, #cfe9e91a, #f0f0f84d)", position:"relative"}}
    >
      <div className="p-4" style={{ backgroundColor: "#bccaf1b8"}}>
        <div className="mb-3" style={{ minWidth: "300px" }}>
          <div className="text-center">
            <h4 className="mb-3">Login</h4>
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
            {/* ---------------------------------PASSWORD-------------------- */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                autoComplete="off"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="enter pass"
              />
              {errors.password && touched.password ? (
                <h6 className="form-error text-danger mb-0">
                  {errors.password}
                </h6>
              ) : null}
            </div>
            <div className="mb-3 d-grid gap-2">
              <button type="submit" className="btn btn-outline-dark">
                SignIn
              </button>
            </div>
            <div className="mb-3"></div>
          </form>
          <div className="">
            <div className="d-grid  align-items-center justify-content-center mb-0">
              <div className="text-center">
                <div className="text-center text-decoration-none">
                  Don't have an account?{" "}
                  <Link to="/auth/signUp" style={{ color: "#4047f3" }}>
                    SignUp Here!
                  </Link>
                </div>
                <div className="mb-1">or</div>
              </div>
            </div>
            <div className="d-flex justify-content-center align-item-center">
              <button
                className="btn btn-outline-dark"
                type="submit"
                onClick={SignUpGoogle}
              >
                <FcGoogle />
                oogle
              </button>
            </div>
            <div className="d-flex justify-content-center align-item-center">
              <Link to="/auth/signIn/forgotPassword">forgot Password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;

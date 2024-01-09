import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";

const Contact = () => {
  const handleReviewSubmit = (values) => {
    try {
      const result = axios.post(
        `${process.env.REACT_APP_DEV_BASE_URL}/contactMail"`,
        {
          message: values.message,
          email: values.email,
        }
      );
      console.log("contact result", result);
    } catch (error) {
      console.log("contact error", error);
    }
  };
  const handleContactSubmit = () => {};
  const handleJobSubmit = () => {};

  return (
    <>
      <div className="container">
        <Formik
          initialValues={{
            reviewMessage: "",
            ReviewEmail: "",
          }}
          validationSchema={Yup.object().shape({
            reviewMessage: Yup.string()
              .min(15, "should be minimum of 15 characters")
              .required("required"),
            ReviewEmail: Yup.string()
              .email("enter a valid email")
              .required("email is required"),
          })}
          onSubmit={(values, action) => {
            handleReviewSubmit(values);
          }}
        >
          {({
            errors,
            values,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} style={{ marginTop: "56px" }}>
              <Row>
                <Col sm="3">
                  <Row>
                    <label htmlFor="message">message</label>
                  </Row>
                  <Row>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      error={errors.message && touched.message}
                      value={values.message}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      rows="8"
                      placeholder="Enter your message here"
                    />
                    {touched.message && errors.message && (
                      <small>{errors.message}</small>
                    )}
                  </Row>
                  <br />
                  <br />
                  <Row>
                    <label htmlFor="messageEmail">Email</label>
                  </Row>
                  <Row>
                    <input
                      id="messageEmail"
                      className="form-control"
                      name="messageEmail"
                    />
                  </Row>
                </Col>
              </Row>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Contact;

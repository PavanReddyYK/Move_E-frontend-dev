import axios from "axios";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";

const FormikForm = (props) => {
    let{formDetails} = props
    let subject = formDetails.subject;
    let headings = {
        CareerContact:{
            name:'Career Contact',
            messageError:'type a message for an opportunity',
            emailError:'email is required',
        },
        Feedback:{
            name:'Feedback',
            messageError:'type a message',
            emailError:'email is required',
        }
    };

  const initialValues = {
    [`${subject}Message`]: "",
    [`${subject}Email`]: "",
  };
  const handleReviewSubmit = (values) => {
    console.log("funnnnnnnnnnn called",values)
    try {
      const result = axios.post(
        `${process.env.REACT_APP_DEV_BASE_URL}/user/contactMail`,
        {
            userMail: values[`${subject}Email`],
            subject,
            mailContent: values.message,
        }
      );
      console.log("contact result", result);
    } catch (error) {
      console.log("contact error", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          [`${subject}Message`]: Yup.string()
            .min(15, "should be minimum of 15 characters")
            .required(headings[`${subject}`].messageError),
          [`${subject}Email`]: Yup.string()
            .email("enter a valid email")
            .required(headings[`${subject}`].emailError),
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
        }) => {
          return (
            <div>
              <form onSubmit={(e)=>{handleSubmit(e) 
                handleReviewSubmit(values)}} style={{ marginTop: "56px" }}>
                <Row className="d-flex justify-content-center align-items-center min-vh-100">
                  <Col
                    sm="3"
                    className="border p-4 rounded-4"
                    style={{ backgroundColor: "#1215219e", minWidth: "350px" }}
                  >
                    <Row>
                      <h4 className="text-light text-center">{headings[`${subject}`].name}</h4>
                    </Row>
                    <Row>
                      <label
                        htmlFor={`${subject}Email`}
                        className="text-light h5 mt-3"
                      >
                        Name
                      </label>
                    </Row>
                    <Row>
                      <input
                        id={`${subject}Email`}
                        className="form-control"
                        name={`${subject}Email`}
                        placeholder="Enter your email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values[`${subject}Email`]}
                        error={errors[`${subject}Email`]}
                      />
                      {touched[`${subject}Email`] &&
                        errors[`${subject}Email`] && (
                          <strong className="text-danger bold">{errors[`${subject}Email`]}</strong>
                        )}
                    </Row>


                    <Row>
                      <label
                        htmlFor={`${subject}Email`}
                        className="text-light h5 mt-3"
                      >
                        Email
                      </label>
                    </Row>
                    <Row>
                      <input
                        id={`${subject}Email`}
                        className="form-control"
                        name={`${subject}Email`}
                        placeholder="Enter your email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values[`${subject}Email`]}
                        error={errors[`${subject}Email`]}
                      />
                      {touched[`${subject}Email`] &&
                        errors[`${subject}Email`] && (
                          <strong className="text-danger bold">{errors[`${subject}Email`]}</strong>
                        )}
                    </Row>
                    <Row>
                      <label
                        htmlFor={`${subject}Message`}
                        className="text-light h5"
                      >
                        Message
                      </label>
                    </Row>
                    <Row>
                      <textarea
                        id={`${subject}Message`}
                        name={`${subject}Message`}
                        className="form-control"
                        aria-invalid={
                          errors[`${subject}Message`] &&
                          touched[`${subject}Message`]
                        }
                        value={values[`${subject}Message`]}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        rows="6"
                        placeholder="Enter your message here"
                      />
                      {touched[`${subject}Message`] &&
                        errors[`${subject}Message`] && (
                          <strong className="text-danger bold">{errors[`${subject}Message`]}</strong>
                        )}
                    </Row>
                    <Row>
                      <button
                        type="submit"
                        className="mt-4 btn btn-outline-secondary"
                      >
                        Send
                      </button>
                    </Row>
                  </Col>
                </Row>
              </form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default FormikForm;

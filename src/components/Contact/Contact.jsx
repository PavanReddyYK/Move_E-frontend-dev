import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import FormikForm from "./FormikForm";

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
  const formObjects = {
    CareerContact:{
      subject:"CareerContact",
    },
    Feedback:{
      subject:"Feedback",
    }
  }

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
          }) => {
              return (
                <div className="">
                  <Row>
                    <Col>
                      <FormikForm formDetails={formObjects.CareerContact}/>
                    </Col>
                    <Col>
                      <FormikForm formDetails={formObjects.Feedback}/>
                    </Col>
                  </Row>
                </div>
              );
            }}
        </Formik>
      </div>
    </>
  );
};

export default Contact;

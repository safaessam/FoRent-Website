import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import BtnsCo from "../Components/Btns";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import ValidSchema from "../schemas/reg";
import "../pages/css/errors.css";
import AlertCom from "../Components/alert";
import "../pages/css/register.css";
import axios from "axios";

export default function SignUp() {
  let accounts = JSON.parse(localStorage.getItem("Account Storage") || "[]");

  const [isSucess, setIsSucess] = useState(false);
  let history = useNavigate();
  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        fullname: "",
        username: "",
        password: "",
        repeatPassword: "",
        role: "",
        termsCheckbox: false,
        phoneNumber: "",
      },
      validationSchema: ValidSchema,

      // onSubmit: (values, { resetForm }) => {
      //   if (isValidEmail(values.email)) {
      //     // accounts.push(values);
      //     // localStorage.setItem("Account Storage", JSON.stringify(accounts));
      //     resetForm(); // h3ml reset ll form l ana 3mltha ashan afdeha
      //     // bas mesh htban ashan hyn2lo

      //     history("/login");
      //   } else {
      //     setIsSucess(true);
      //   }
      // },

      onSubmit: async (values, { resetForm, setSubmitting }) => {
        // Check if the form is valid
        if (Object.keys(errors).length === 0) {
          try {
            // Prepare the data to be posted
            const newData = {
              username: values.username,
              first_name: values.fullname.split(" ")[0], // Assuming fullname is in the format "Firstname Lastname"
              last_name: values.fullname.split(" ")[1],
              name: values.fullname,
              email: values.email,
              password: values.password,
              birthdate: null, // Make sure the format is correct
              role: values.role,
              validation_states: true, // Assuming it's always true on registration
              registration_date: new Date().toISOString(), // Current date and time
              profile_picture: null, // Assuming no profile picture provided
              phone_number: values.phoneNumber,
            };

            // Perform the POST request
            const response = await axios.post(
              "http://127.0.0.1:8000/users/",
              newData
            );

            console.log("Data posted successfully:", response.data);
            // You can perform further actions after successful posting

            // Reset the form
            resetForm();

            // Redirect to login page after successful registration
            history.push("/login");
          } catch (error) {
            console.error("Error posting data:", error);
            // Handle error if needed
          }
        } else {
          setSubmitting(false);
          setIsSucess(true);
        }
      },
    });

  // hnshghl l function bas enha tdini error bdl mt3ml push

  const isValidEmail = (email) => {
    const found = accounts.find((item) => item.email === email);
    return !found;
  };

  return (
    <>
      <div className=" d-flex justify-content-between align-items-center flex-wrap">
        <Col xs={12} lg={6}>
          <Image
            src="https://images.pexels.com/photos/19265094/pexels-photo-19265094/free-photo-of-a-view-of-the-bosphorus-bridge-from-a-boat.jpeg"
            className="m-0 img-fluid position-relative w-100 h-auto h-lg-100"
            style={{ maxWidth: "auto", maxHeight: "900px" }}
          />
          <div className="cs-posti position-absolute">
            <h3 className="text-white">For Rent</h3>
            <p className="text-white">
              Welcome to ForRent Website Where Renting buying and Selling is
              Easier
            </p>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className="container pt-5">
            <h1 className="text-center"> Create Your Account </h1>
            <Form className="container" onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  value={values.username}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Username..."
                  id="username"
                  onChange={handleChange}
                  className={
                    errors.username && touched.username ? "input-error" : ""
                  }
                />
                {errors.username && touched.username && (
                  <p className="error">{errors.username}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  value={values.fullname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  placeholder="Fullname ex: John Doe..."
                  id="fullname"
                  className={
                    errors.fullname && touched.fullname ? "input-error" : ""
                  }
                />
                {errors.fullname && touched.fullname && (
                  <p className="error">{errors.fullname}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  placeholder="name@example.com"
                  id="email"
                  className={errors.email && touched.email ? "input-error" : ""}
                />
                {errors.email && touched.email && (
                  <p className="error">{errors.email}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  value={values.phoneNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  id="phoneNumber"
                  placeholder="Phonenumber"
                  className={
                    errors.phoneNumber && touched.phoneNumber
                      ? "input-error"
                      : ""
                  }
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="error"> {errors.phoneNumber} </p>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  id="password"
                  placeholder="Password"
                  aria-describedby="passwordHelpBlock"
                  className={
                    errors.password && touched.password ? "input-error" : ""
                  }
                />
                {errors.password && touched.password && (
                  <p className="error"> {errors.password} </p>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  value={values.repeatPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  type="password"
                  id="repeatPassword"
                  aria-describedby="passwordHelpBlock"
                  className={
                    errors.repeatPassword && touched.repeatPassword
                      ? "input-error"
                      : ""
                  }
                />
                {errors.repeatPassword && touched.repeatPassword && (
                  <p className="error"> {errors.repeatPassword} </p>
                )}

                <div className="pt-3">
                  <Form.Select
                    id="role"
                    name="role"
                    aria-label="Member Type"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.role && touched.role ? "input-error" : ""}
                  >
                    <option value="">Account Type</option>
                    <option value="Owner">Owner</option>
                    <option value="Renter">Renter</option>
                  </Form.Select>
                  {errors.role && touched.role && (
                    <p className="error">{errors.role}</p>
                  )}
                </div>

                <div className="pt-3">
                  <Form.Check
                    type="checkbox"
                    id="termsCheckbox"
                    label="I accept Terms and Conditions"
                    checked={values.termsCheckbox}
                    onChange={handleChange}
                    isInvalid={!!errors.termsCheckbox && touched.termsCheckbox}
                    className={
                      errors.termsCheckbox && touched.termsCheckbox
                        ? "input-error"
                        : ""
                    }
                  />

                  {errors.termsCheckbox && touched.termsCheckbox && (
                    <p className="error">{errors.termsCheckbox}</p>
                  )}
                </div>
              </Form.Group>

              <div className="container d-flex justify-conent-center flex-column gap-3">
                <BtnsCo
                  btnType="submit"
                  btnCs={{ backgroundColor: "#008f97" }}
                  btnCo="primary"
                  btnText="SignUp"
                />
                <BtnsCo
                  btnCo="secondary"
                  btnLogo="fab fa-google"
                  btnText="SignUp With Google"
                  btnStyle=""
                />
                <p>
                  Already Have An Account? <Link to={"/login"}>SignIn</Link>{" "}
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </div>

      {isSucess && (
        <>
          <div className="container">
            <AlertCom
              errorType="danger"
              errorHead="Account Already Registered"
              errorMsg="              Oops! Looks like you've already claimed this spot. No need to
              double-dip; your account is already up and running. If you're
              having trouble accessing it, hit up our support team—they're
              wizards at sorting things out!"
            />
          </div>
        </>
      )}
    </>
  );
}

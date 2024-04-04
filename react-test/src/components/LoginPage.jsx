import React, { useEffect, useState } from "react";

import * as yup from "Yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Label } from "reactstrap";
import toast from "react-hot-toast";
import { userLogin } from "../Helper/Helper";
import { useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import NavBar from "./NavBar";
import bcrypt from "bcryptjs";
import sha256 from "crypto-js/sha256";

const LoginPage = () => {
  const naviagte = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validate = yup.object({
    email: yup.string().required("Email is required!"),
    password: yup.string().required("Password is required!!"),
  });
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (resp) => setUser(resp),
    onFailure: (err) => console.log("Login Failed : ", err),
  });

  // log out function to log the user out of google and set the profile array to null
  const logout = () => {
    googleLogout();
    setProfile(null);
    console.log(profile);
  };

  useEffect(() => {
    if (user.length > 0) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          setProfile(response.data);
          console.log(response.data);
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem("user_Name", response.data.name);
          setTimeout(() => {
            naviagte("/dashboard");
          }, 1000);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const submitForm = (values) => {
    console.log("submitted");

    const userDetails = sessionStorage.getItem("userDetails");
    const userDetailsObj = JSON.parse(userDetails);

    if (
      values.email == userDetailsObj.email &&
      sha256(values.password).toString() == userDetailsObj.password
      // bcrypt.compareSync(values.password, userDetailsObj.password)
      // values.password == userDetailsObj.password
    ) {
      // console.log("success");
      toast.success("login successful");
      setTimeout(() => {
        naviagte("/dashboard");
      }, 1000);
    } else {
      // console.log("error");
      toast.error("incorrect name or password", { duration: 1000 });
    }

    // hit api and get response from backend
    // userLogin(values)
    //   .then((response) => {
    //     // if got  response navigate to dashboard
    //     console.log(response.data);
    //     sessionStorage.setItem("userDetails", JSON.stringify(response.data));
    //     toast.success("login successful");
    //     setTimeout(() => {
    //       naviagte("/dashboard");
    //     }, 1000);
    //   })
    //   .catch(() => {
    //     //else toast incorrect name or password
    //     toast.error("incorrect name or password", { duration: 1000 });
    //   });
  };

  return (
    <div className="bg-black vh-100   ">
      <NavBar />
      <div className=" container-fluid  d-flex justify-content-center    py-5  loginpageContainer   ">
        <div
          // style={{ background: "#111010" }}
          className="  d-flex white-shadow  border "
        >
          <div className="form-container col-md-6 text-white   border-end   p-3 sign-in-container ">
            <h1 className="text-center">Sign in</h1>
            <div className="social-container text-center p-2">
              <a href="#" className="social mx-2 p-2     ">
                <i className="fa fa-facebook-f text-white  " />
              </a>
              <a
                href="#"
                className="social mx-2 p-2   text-white"
                onClick={login}
              >
                <i className="fa-brands fa-google"></i>
              </a>
              <a href="#" className="social mx-2 p-2   text-white">
                <i className="fa fa-linkedin" />
              </a>
            </div>
            <div className="d-flex justify-content-center ">
              <span className="form-text text-white   ">
                or use your account
              </span>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validate}
              onSubmit={(val) => submitForm(val)}
            >
              {(formik) => (
                <div>
                  <Form className="form p-3" style={{ fontSize: "13px" }}>
                    <div className="form-group mt-1 mb-3  ">
                      <Label htmlFor="email" className="form-label">
                        Email
                      </Label>
                      <Field
                        type="email"
                        name="email"
                        label="Email"
                        style={{ color: "white", fontSize: "13px" }}
                        placeholder="example@gmail.com"
                        className={`form-control   rounded-0 bg-transparent border-0 border-bottom    ${
                          formik.touched.email &&
                          formik.errors.email &&
                          "is-invalid"
                        }`}
                        id="email"
                      />
                      <ErrorMessage
                        component="div"
                        name="email"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group mt-1 text-white ">
                      <Label
                        htmlFor="password"
                        className="form-label text-white "
                      >
                        Password
                      </Label>
                      <Field
                        type="password"
                        style={{ color: "white", fontSize: "13px" }}
                        name="password"
                        label="Password"
                        placeholder="qwert@123"
                        className={`form-control bg-transparent border-0 border-bottom   rounded-0 ${
                          formik.touched.password &&
                          formik.errors.password &&
                          "is-invalid"
                        }`}
                        id="password"
                      />
                      <ErrorMessage
                        component="div"
                        name="password"
                        className="text-danger"
                      />
                    </div>
                    <div className="container text-center">
                      <button
                        className="btn btn-outline-light background-primary rounded-pill  m-3 mt-4  px-3   "
                        type="submit"
                      >
                        Sign In
                      </button>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div>

          <div className="signinBack d-flex  align-items-center justify-content-center    col-md-6 ">
            <div className="info  h-100      text-white text-center p-5    ">
              <div className="mt-5">
                <h1>Get Started!!</h1>
                <p>New User ?</p>
                <a
                  href="/signup"
                  className="btn btn-outline-light rounded-pill"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

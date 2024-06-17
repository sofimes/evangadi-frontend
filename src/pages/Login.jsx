import React from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import classes from "../style/login.module.css";
import Common from "./Common";
import Header from "./Header";

const Login = () => {
  const navigate = useNavigate();
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (!emailValue || !passwordValue) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });
      alert("login successfully.");
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  }
  return (
    <>
      <Header />
      <section className={classes.wrapper}>
        <div className={classes.login_box}>
          <div className={classes.form_description}>
            <h4>Login to your account</h4>
            <span className={classes.brown}>Don't have an account? </span>

            <Link to={"/register"} className={classes.nodecore}>
              <span className={classes.orange}>Create a new account</span>
            </Link>
          </div>

          <form action="" onSubmit={handleSubmit} className={classes.form}>
            <input type="email" ref={emailDom} placeholder="    Email" />
            <br />
            <input
              type="password"
              ref={passwordDom}
              placeholder="    Password"
            />
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
        <Common />
      </section>
    </>
  );
};

export default Login;

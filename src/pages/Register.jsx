import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { Link } from "react-router-dom";
import Common from "./Common";
import classes from "../style/registration.module.css";
import Header from "./Header";
const Register = () => {
  const navigate = useNavigate();
  const userNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  const firstnameDom = useRef(null);
  const lastnameDom = useRef(null);
  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    const firstnameValue = firstnameDom.current.value;
    const lastnameValue = lastnameDom.current.value;
    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("Please fill all the fields");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });
      alert("User registered successfully.please login");
      navigate("/login");
    } catch (error) {
      console.log(error.response);
    }
  }
  return (
    <>
      <Header hideHeader={true} />
      <section className={classes.wrapper}>
        <div className={classes.register_box}>
          <div className={classes.form_description}>
            <h4>Join the network</h4>
            <span className={classes.brown}>Already have an account? </span>
            <Link to={"/login"} className={classes.nodecore}>
              <span className={classes.orange}>Sign in</span>
            </Link>
          </div>
          <form action="" onSubmit={handleSubmit} className={classes.form}>
            <input type="email" ref={emailDom} placeholder="    Email adress" />
            <br />
            <input type="text" ref={userNameDom} placeholder="    username" />
            <br />
            <div className={classes.name}>
              <input
                type="text"
                ref={firstnameDom}
                placeholder="    First name"
              />
              <input
                type="text"
                ref={lastnameDom}
                placeholder="    Last name"
              />
            </div>
            <br />
            <input
              type="password"
              ref={passwordDom}
              placeholder="    Password"
            />
            <br />
            <p className={classes.brown}>
              I agree to the{" "}
              <span className={classes.orange}>privacy policy</span> and{" "}
              <span className={classes.orange}>terms of service</span>
            </p>
            <br />
            <button type="submit">Agree and Join</button>
            <br />
            <Link to={"/login"} className={classes.nodecore}>
              <span className={classes.orange}>Already have an account?</span>
            </Link>
          </form>
        </div>
        <Common />
      </section>
    </>
  );
};

export default Register;

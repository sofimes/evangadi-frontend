import React from "react";
import classes from "../style/common.module.css";
import { Link } from "react-router-dom";

const Common = () => {
  return (
    <div className={classes.login_box_2}>
      <span>About</span>
      <h1>Evangadi Networks</h1>
      <p>
        No matter what stage of life you are in,whether you're just starting
        elementary school or being promoted to CEO of a fortune 500 company, you
        have much to offer to those who are trying to follow in your footsteps.
      </p>
      <br />
      <p>
        Whether you are willing to share your knowledge or you are just looking
        to meet mentors of your own, please start by joining the network here.
      </p>
      <br />
      <button type="submit">
        <Link to={"/login"} className={classes.nodecore}>
          SIGN IN
        </Link>
      </button>
    </div>
  );
};

export default Common;

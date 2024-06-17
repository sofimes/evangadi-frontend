import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/evangadi-logo-footer.png";
import { BsFacebook } from "react-icons/bs";
import { ImInstagram } from "react-icons/im";
import { FaYoutube } from "react-icons/fa";
import classes from "../style/footer.module.css";
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.insidewrapper}>
        <div style={{ width: "30%" }}>
          <Link to="/" style={{ paddingBottom: "20px" }}>
            <img src={logo} alt="evangadi_logo" />
          </Link>
          <div className={classes.icon}>
            <BsFacebook size="35" />
            <ImInstagram size="35" />
            <FaYoutube size="35" />
          </div>
        </div>
        <div className={classes.terms}>
          <h3>Useful Link</h3>
          <ul>
            <li>Terms of use</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className={classes.terms}>
          <h3>Contact Info</h3>
          <ul>
            <li>support@evangadi.com</li>
            <li>+1-202-386-2702</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

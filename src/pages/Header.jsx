import React from "react";
import logo from "../images/headerlogo.png";
import classes from "../style/header.module.css";
import { Link } from "react-router-dom";
// const Header = () => {
//   return (
//     <div>
//       <div className={classes.header}>
//         <div className={classes.logo_handler}>
//           <Link to="/">
//             <img src={logo} alt="evangadi_logo" />
//           </Link>
//         </div>
//         <div className={classes.header1}>
//           <h3>Home</h3>
//         </div>
//       </div>
//     </div>
//   );
// };
const Header = () => {
  function logout() {
    // const token = localStorage.getItem("token")
    localStorage.clear();
  }
  return (
    <section className={classes.Header}>
      <div className={classes.Header__container}>
        <div className={classes.logo__container}>
          <a href="">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className={classes.links}>
          <div className={classes.link__containers}>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to="#">How it Works</Link>
              </li>
            </ul>
          </div>
          <Link to="/Login">
            <button onClick={logout}>Logout</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;

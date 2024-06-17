import React, { useContext, useState, useEffect } from "react";
import axios from "../axiosConfig";
import { Link } from "react-router-dom";
import { AppState } from "../App";
import classes from "../style/dashboard.module.css";
import { MdAccountCircle } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import Header from "./Header";

function DashBoard() {
  const { user } = useContext(AppState);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`/questions/questionsget`, {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        });
        setQuestions(response.data[0]);
        console.log(response.data[0]);
      } catch (error) {
        console.error("fetching questions: ", error.message);
      }
    };
    fetchQuestions();
  }, []);
  // console.log(questions);

  return (
    <>
      <Header />
      <section className={classes.DashBoard_container}>
        <section className={classes.DashBoard_inner_container}>
          <div>
            <button>
              <Link to={"/ask"}>Ask Question</Link>
            </button>
            <h1>Welcome: {user.username} </h1>
          </div>
          <h2>Question</h2>
          <ul style={{ margin: "0 auto" }}>
            {questions.map((question) => {
              return (
                <li key={question.questionid} className={classes.questionItem}>
                  <hr />
                  <div className={classes.questionContent}>
                    <Link
                      onClick={() =>
                        localStorage.setItem(
                          "questionInfo",
                          JSON.stringify(question)
                        )
                      }
                      to={`/answer/${question.questionid}`}
                      style={{
                        // color: "#4b456f;",
                        color: "black",
                        fontWeight: "bold",
                        marginLeft: "10px",
                        fontSize: "25px",
                        textDecoration: "none",
                      }}
                    >
                      <div className={classes.questionTitle}>
                        <div className={classes.users}>
                          <MdAccountCircle
                            style={{
                              marginTop: "30px",
                              marginBottom: "0px",
                              marginLeft: "20px",
                              fontSize: "80px",
                              color: "black;",
                              // color: "#4b456f;",
                            }}
                          />
                          <b>{user.username}</b>
                        </div>
                        <div className={classes.title}>
                          <p className={classes.mapped}>{question.title}</p>
                        </div>
                        <div className={classes.link__arrow}>
                          <FaAngleRight className={classes.icons_right} />
                        </div>
                      </div>
                    </Link>
                  </div>
                  {/* <hr /> */}
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    </>
  );
}

export default DashBoard;

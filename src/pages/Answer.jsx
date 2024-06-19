import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "../axiosConfig";
import classes from "../style/answer.module.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import { MdAccountCircle } from "react-icons/md";
import { AppState } from "../App";

function Answer() {
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState([]);
  const [previouslyAnsweredQuestionId, setPreviouslyAnsweredQuestionId] =
    useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("token");
  const answerDom = useRef();
  const { user } = useContext(AppState);
  const [question, setQuestion] = useState("");

  const fetchQuestion = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("/questions/questionsget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setQuestion(response.data[0]);
        console.log(response.data[0]);
      } else {
        setMessage("Failed to fetch question.");
      }
    } catch (error) {
      console.error("Error fetching question:", error.message);
      setMessage("An error occurred while fetching question.");
    }
  };

  const fetchAnswers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("/answers/all-answersget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.status, response);

      if (response.status === 200) {
        setAnswers(response.data); // Ensure this is an array
        console.log(response.data);
      } else {
        setMessage("Failed to fetch answers.");
      }
    } catch (error) {
      console.error("Error fetching answers:", error.message);
      setMessage("An error occurred while fetching answers.");
    }
  };

  const previouslyAnsweredQuestionInfo = localStorage.getItem("questionInfo");
  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
    console.log(previouslyAnsweredQuestionInfo);
    if (previouslyAnsweredQuestionInfo) {
      const previouslyAnsweredQuestion = JSON.parse(
        previouslyAnsweredQuestionInfo
      );
      setPreviouslyAnsweredQuestionId(previouslyAnsweredQuestion.questionid);
      console.log(previouslyAnsweredQuestion.questionid);
    }
  }, []);

  const handelPostAnswer = async () => {
    const answerValue = answerDom.current.value;
    if (!answerValue) {
      setError("Please provide all required fields.");
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `/answers/answerspost/${previouslyAnsweredQuestionId}`,
        {
          answer: answerValue,
          headers: { Authorization: `Bearer ${token}` },
          questionid: previouslyAnsweredQuestionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        setAnswers([...answers, response.data.answer]); // Append the new answer to the existing answers array
        console.log(response.data);
        setMessage("Answer submitted successfully.");
        setSuccess("Question answered successfully");
      } else {
        setMessage("Answer submitted successfully.");
      }
      fetchAnswers();
    } catch (error) {
      console.error("Error submitting answer:", error.message);
      setMessage("An error occurred while submitting the answer.");
    }
  };

  return (
    <>
      <Header />
      <section className={classes.answer}>
        <section className={classes.answer_container}>
          <h2>Question:</h2>
          <div className={classes.questionContent}>
            <div className={classes.questionTitle}>
              <h3>{JSON.parse(previouslyAnsweredQuestionInfo)?.title}</h3>
              <h4>{JSON.parse(previouslyAnsweredQuestionInfo)?.description}</h4>
            </div>
            <hr />
          </div>
          <h1>Answer From The Community</h1>
          <hr />
          <div>
            {message && <p>{message}</p>}
            {Array.isArray(answers) && answers.length > 0 ? (
              <div>
                {console.log(
                  "previouslyAnsweredQuestionId",
                  previouslyAnsweredQuestionId
                )}

                {answers
                  .filter(
                    (ans) => ans.questionid === previouslyAnsweredQuestionId
                  )
                  .map((ans, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <div className={classes.answerUser}>
                        <MdAccountCircle
                          style={{
                            marginRight: "10px",
                            fontSize: "60px",
                            color: "gray",
                          }}
                        />
                        <b>{ans.username}</b>
                      </div>

                      <div className={classes.answerfromusers}>
                        <br />
                        {ans.answer}
                        <br />
                      </div>
                      <hr />
                    </div>
                  ))}
              </div>
            ) : (
              <p>No answers yet.</p>
            )}
          </div>

          {error && <p style={{ padding: "5px", color: "red" }}>{error}</p>}
          <div className="answer_container">
            <input
              className={classes.first_input}
              ref={answerDom}
              type="textarea"
              placeholder="Your answer..."
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div>
            {success && (
              <p style={{ padding: "5px", color: "green" }}>{success}</p>
            )}
            <button onClick={handelPostAnswer}>
              <Link to="#">Post Your Answer</Link>
            </button>
          </div>
        </section>
      </section>
    </>
  );
}

export default Answer;

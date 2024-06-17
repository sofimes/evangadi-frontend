import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import axios from "./axiosConfig";
import Ask from "./pages/Ask";
import Footer from "./pages/Footer";
import Answer from "./pages/Answer";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }
  // useEffect(() => {
  //   checkUser();
  // }, []);
  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/answer/:questionid" element={<Answer />} />
        <Route path="/ask" element={<Ask />} />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App;

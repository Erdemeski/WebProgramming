import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header.jsx";
import Users from "./components/Users.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Quiz from "./components/Quiz.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Main from "./components/Main.jsx";
import { UserContext } from "./UserContext.js";

function App() {


  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);

  const updateUserData = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          user: user,
          setUserContext: updateUserData
        }}
      >
        <div className="App">
          <Header title="Quiz Show"></Header>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/trivia" element={user ? (<Quiz />) : (<Navigate to="/login" />)} />
            <Route path="/profile" element={user ? (<UserProfile />) : (<Navigate to="/login" />)} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

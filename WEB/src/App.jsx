import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// import Login from "./components/Login";
import Home from "./components/home/index";
import Courses from "./components/courses/index";
// import { auth } from "./firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavBar } from "./components/NavBar/index";



export default function App(props) {

  const [isLogin, setIsLogin] = useState(true);

  // const auth = getAuth();
  // useEffect(() => {
  //   const Unsubscribe =    onAuthStateChanged(auth, (user) => {
  //     console.log(user);
  //     // const uid = user.uid;
  //     if (user) setIsLogin(true);
  //     else setIsLogin(false);
  //   });
  // // return () => Unsubscribe();
  // }, []);

  return (
    <div className="App">
      <NavBar/>
      {isLogin ? (
        <Routes>
          <Route path="/" element={<Home />} />

          {/* <Route path="attendance" element={<Attendance />} />
          <Route path="courses" element={<Courses />} />
          <Route path="students" element={<Students />} /> */}
          {/* <Route path="profile" element={<Profile />} /> */}

          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      ) : (
        <Routes>
          {/* <Route
            path="/login"
            element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
          /> */}
          {/* <Route path="signup" element={<Signup />} /> */}
          {/* <Route path="*" element={<Navigate to="/login" replace={true} />} /> */}
        </Routes>
      )}
    </div>
  );
}

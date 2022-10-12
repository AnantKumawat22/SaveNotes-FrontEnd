import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  // Alert
  const [alert, setAlert] = useState(null);

  // Setting Alert and closing it by using setTimeout in 1500ms.
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container-fluid">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              {/* <Route exact path="/users" component={<About/>}/> */}
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

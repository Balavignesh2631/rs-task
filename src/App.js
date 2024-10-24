import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Studentpage from "./components/Studentpage";
import Studenform from "./components/Studenform";
import EditStudent from "./components/EditStudent";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage></Homepage>}></Route>
          <Route path="/student" element={<Studentpage></Studentpage>}></Route>
          <Route path="/add" element={<Studenform></Studenform>}></Route>
          <Route path='/edit/:id' element={<EditStudent></EditStudent>}></Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;


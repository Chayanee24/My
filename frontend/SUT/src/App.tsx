import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ConfigRoutes from "./routes";
import "./App.css";
// import CarouselComponent from "./components/CarouselComponent";
const App: React.FC = () => {

  return (

    <Router>
      {/* <h1 style={{ textAlign: "center", margin: "20px 0" }}>Concert Event</h1> */}
      <ConfigRoutes />
    
    </Router>


  );

};

export default App;


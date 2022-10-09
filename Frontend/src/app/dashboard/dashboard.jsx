import "./dashboard.scss";
import React from "react";

import Navbar from "../../components/navbar/navbar.jsx";
import Card from "../../components/card/card.jsx";



const Dashboard = () => {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <div className="grid_wrapper">
        <Card></Card>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;

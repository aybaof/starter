import "./dashboard.scss";
import React from "react";

import Navbar from "../../components/navbar/navbar.jsx";
import Card from "../../components/card/card.jsx";

let cardList = []
for (let i = 0; i < 10; i++) {
  cardList.push(<Card></Card>);
} 

const Dashboard = () => {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <div className="grid_wrapper">
        <Card></Card>
        {cardList}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import ContentDashboard from "../components/ContentDashboard";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <Menu />
      <ContentDashboard />
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;

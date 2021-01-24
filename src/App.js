import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LaporanKriminal from "./pages/LaporanKriminal";
import Pelapor from "./pages/DaftarPelapor";
import Kriminal from "./pages/DaftarKriminal";
import Login from "./pages/Login";
import "./config/config";
import DataPolsek from "./pages/DaftarPolsek";
import DataPesan from "./pages/DaftarPesan";
import Maps from "./pages/DetailMaps";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/Dashboard" component={Dashboard} />
      <Route exact path="/DataPolsek" component={DataPolsek} />
      <Route exact path="/DataPesan" component={DataPesan} />
      <Route exact path="/DataLaporan" component={LaporanKriminal} />
      <Route exact path="/DaftarPelapor" component={Pelapor} />
      <Route exact path="/DaftarKriminal" component={Kriminal} />
      <Route exact path="/Maps" component={Maps} />
    </Router>
  );
}

export default App;

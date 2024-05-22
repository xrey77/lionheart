import React from "react";
import {
  Router,
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Aboutus from "./Aboutus";
import Contactus from "./Contactus";
import Home from "./Home";

export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/contactus" element={<Contactus />} />
        </Routes>
  );
}

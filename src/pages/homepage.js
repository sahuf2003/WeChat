// Home.js
import React from "react";
import Intro from "../components/Intro";
import Working from "../components/Working";
import Usecases from "../components/Usecases";
import Footer from "../components/Footer";
import Navcomp from "../components/Navcomp"

const Home = () => {
  return (
    <div>
      <Intro />
      <Working />
      <Usecases />
      <Footer />
    </div>
  );
};

export default Home;

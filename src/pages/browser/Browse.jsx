import React, { useContext } from "react";
import ContextMovies from "../hooks/ContextMovies";
import NavBar from "./NavBar";
import Banner from "./Banner";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import classes from "./Banner.module.css";

function Browse() {
  return (
    <div className={` text-white ${classes.marginBottom}`}>
      <NavBar />
      <Banner />
      <MovieList />
    </div>
  );
}

export default Browse;

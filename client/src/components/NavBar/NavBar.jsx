import React from "react";
import { Link } from "react-router-dom";
import Pokemonlogo from "../../assets/PokemonLogo.jsx";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className="NavBar">
      <div className="NavBar__container">
        <Link to="/home">
          <Pokemonlogo />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;

import React from "react";
import { Link } from "react-router-dom";
import Pokemonlogo from "../../assets/PokemonLogo.jsx";
import styles from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = ({ handleBotonMenu }) => {
  return (
    <div className="NavBar">
      <div className={styles.NavBarContainer}>
        <Link to="/home">
          <Pokemonlogo className={styles.logo} />
        </Link>

        <div class={styles.Menu} onClick={handleBotonMenu}>
          <div class={styles.Menu__line}></div>
          <div class={styles.Menu__line}></div>
          <div class={styles.Menu__line}></div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

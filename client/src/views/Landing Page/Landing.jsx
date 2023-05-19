import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPokemons, getType } from "../../redux/actions/actions";
import Pokemonlogo from "../../assets/PokemonLogo.jsx";
import styles from "./Landing.module.css";
import charizardGif from "../../assets/charizard.gif";

function Landing() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);

  useEffect(() => {
    if (types.length === 0 && pokemons.length === 0) {
      dispatch(getType());
      dispatch(getPokemons());
    }
  }, []);

  return (
    <div>
      <div className={styles.Landing}>
        <div className={styles.LandingContainer}>
          <img
            src={charizardGif}
            alt="Charizard"
            className={styles.charizardGif}
          />
          <div className={styles.logoContainer}>
            {" "}
            <Pokemonlogo />
          </div>
          <div className={styles.LandingBotonContainer}>
            <Link to="/home">
              <button className={styles.botonHome}>Atrapalos Ya!</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

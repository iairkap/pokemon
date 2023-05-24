/*
 */

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getType } from "../../redux/actions/actions";
import Pokemonlogo from "../../assets/PokemonLogo.jsx";
import styles from "./Landing.module.css";
import charizardGif from "../../assets/charizard.gif";
import { connect } from "react-redux";

class Landing extends React.Component {
  componentDidMount() {
    const { dispatch, types, pokemons } = this.props;

    if (types.length === 0 && pokemons.length === 0) {
      dispatch(getType());
      dispatch(getPokemons());
    }
  }

  render() {
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
}

export default connect((state) => ({
  types: state.types,
  pokemons: state.pokemons,
}))(Landing);

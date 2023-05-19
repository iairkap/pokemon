import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonByID, setPokemonsDetail } from "../../redux/actions/actions";
import Loading from "../../assets/loading";
import { Link } from "react-router-dom";
import styles from "./Detail.module.css";
import electricIcon from "../../assets/Icons-Types/electric.png";
import psychicIcon from "../../assets/Icons-Types/psychic.png";
import normalIcon from "../../assets/Icons-Types/normal.png";
import dragonIcon from "../../assets/Icons-Types/dragon.png";
import fightingIcon from "../../assets/Icons-Types/fighting.png";
import grassIcon from "../../assets/Icons-Types/grass.png";
import bugIcon from "../../assets/Icons-Types/bug.png";
import fireIcon from "../../assets/Icons-Types/fire.png";
import waterIcon from "../../assets/Icons-Types/water.png";
import ghostIcon from "../../assets/Icons-Types/ghost.png";
import steelIcon from "../../assets/Icons-Types/steel.png";
import iceIcon from "../../assets/Icons-Types/ice.png";
import rockIcon from "../../assets/Icons-Types/rock.png";
import groundIcon from "../../assets/Icons-Types/ground.png";
import fairyIcon from "../../assets/Icons-Types/fairy.png";
import darkIcon from "../../assets/Icons-Types/dark.png";
import poisonIcon from "../../assets/Icons-Types/poison.png";
import flyingIcon from "../../assets/Icons-Types/flying.png";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.pokemonDetail[0]);

  useEffect(() => {
    dispatch(getPokemonByID(id));

    // Clean up function
    return () => {
      dispatch(setPokemonsDetail([]));
    };
  }, []);

  function getBackgroundStyle(type) {
    switch (type) {
      case "normal":
        return styles["normal"];
      case "fire":
        return styles["fire"];
      case "water":
        return styles["water"];
      case "electric":
        return styles["electric"];
      case "grass":
        return styles["grass"];
      case "ice":
        return styles["ice"];
      case "fighting":
        return styles["fighting"];
      case "poison":
        return styles["poison"];
      case "ground":
        return styles["ground"];
      case "flying":
        return styles["flying"];
      case "psychic":
        return styles["psychic"];
      case "bug":
        return styles["bug"];
      case "rock":
        return styles["rock"];
      case "ghost":
        return styles["ghost"];
      case "dragon":
        return styles["dragon"];
      case "dark":
        return styles["dark"];
      case "steel":
        return styles["steel"];
      case "fairy":
        return styles["fairy"];
      default:
        return "";
    }
  }
  const typeIcons = {
    electric: electricIcon,
    psychic: psychicIcon,
    normal: normalIcon,
    dragon: dragonIcon,
    fighting: fightingIcon,
    grass: grassIcon,
    bug: bugIcon,
    fire: fireIcon,
    water: waterIcon,
    ghost: ghostIcon,
    steel: steelIcon,
    ice: iceIcon,
    rock: rockIcon,
    ground: groundIcon,
    fairy: fairyIcon,
    dark: darkIcon,
    poison: poisonIcon,
    flying: flyingIcon,
  };

  return (
    <div
      className={`${styles.PokemonDetailContainer} ${
        pokemonDetail ? getBackgroundStyle(pokemonDetail.types[0]) : ""
      }`}
    >
      <div
        className={styles.BackButtonContainer}
        onClick={() => dispatch(setPokemonsDetail())}
      >
        <Link to="/home">
          <button className={styles.BackButton}>Back</button>
        </Link>
      </div>
      {!pokemonDetail && (
        <div className={styles.LoadingContainer}>
          <Loading />
        </div>
      )}
      <div className={styles.container}>
        {pokemonDetail && (
          <div className={styles.PokemonDetail}>
            <div className={styles.PokemonImage}>
              <img src={pokemonDetail.image} alt={pokemonDetail.name} />
            </div>
            <div className={styles.PokemonDetailInfo}>
              <h1>{pokemonDetail.name.toUpperCase()}</h1>
              <h3>Attack: {pokemonDetail.attack}</h3>
              <h3>Defense: {pokemonDetail.defense}</h3>
              <h3>Speed: {pokemonDetail.speed}</h3>
              <h3>Height: {pokemonDetail?.height}</h3>
              <h3>Weight: {pokemonDetail?.weight}</h3>
              <h3>Life: {pokemonDetail.hp}</h3>
              {pokemonDetail.types.map((type, index) => (
                <div key={index} className={styles.TypeContainer}>
                  <p className={styles.TypeName}>Type: {type}</p>
                  <img
                    src={typeIcons[type]}
                    alt={type}
                    className={styles.TypeIcon}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;

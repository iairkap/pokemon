import React from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../assets/loading";
import styles from "../../views/Detail Page/Detail.module.css";
import typeIcons from "../../assets/Icons-Types/TypeIcons";

function PokemonDetailPresentation({ pokemonDetail, handleBackClick }) {
  const history = useHistory();

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
      case "shadow":
        return styles["shadow"];

      default:
        return "";
    }
  }
  const goBack = () => {
    handleBackClick();
    history.push("/home");
  };

  return (
    <div
      className={`${styles.PokemonDetailContainer} ${
        pokemonDetail ? getBackgroundStyle(pokemonDetail.types[0]) : ""
      }`}
    >
      <div className={styles.BackButtonContainer}>
        <button className={styles.BackButton} onClick={goBack}>
          Volver
        </button>
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

export default PokemonDetailPresentation;

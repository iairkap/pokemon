import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPokemons } from "../../redux/actions/actions";
import styles from "./Card.module.css";

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

function Card({ id, image, name, types }) {
  const dispatch = useDispatch();

  function getCardStyle(type) {
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

  const cardStyle = types?.length ? getCardStyle(types[0]) : "";

  return (
    <div className={`${styles.card} ${cardStyle}`}>
      <Link to={`/detail/${id}`} onClick={() => dispatch(setPokemons())}>
        <img className={styles.imagen} src={image} alt={name} />
      </Link>
      <div className={styles.card_info}>
        <h3 className={styles.Name}>{name}</h3>
        <div className={styles.Types}>
          {types?.length > 0 &&
            types.map((type, index) => (
              <React.Fragment key={index}>
                <span>{type}</span>
                {typeIcons[type] && (
                  <img
                    src={typeIcons[type]}
                    alt={type}
                    width="30"
                    height="30"
                  />
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Card;

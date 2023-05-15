import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPokemons } from "../../redux/actions/actions";
import styles from "./Card.module.css";

function Card({ id, image, name, types }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.card}>
      <Link to={`/detail/${id}`} onClick={() => dispatch(setPokemons())}>
        <img className={styles.imagen} src={image} alt={name} />
      </Link>
      <div className={styles.card_info}>
        <h3 className="Name">{name}</h3>
        <div className="Types">
          {types?.length > 0 &&
            types.map((type, index) => <p key={index}>{type}</p>)}
        </div>
      </div>
    </div>
  );
}

export default Card;

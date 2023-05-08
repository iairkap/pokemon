import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPokemons } from "../../redux/actions/actions";

function Card({ id, image, name, types }) {
  const dispatch = useDispatch();

  return (
    <div className="Card">
      <Link to={`/pokemon/${id}`} onClick={() => dispatch(setPokemons())}>
        <img src={image} alt={name} />
      </Link>
      <div className="Card__info">
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

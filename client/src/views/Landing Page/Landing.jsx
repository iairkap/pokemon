import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPokemons, getType } from "../../redux/actions/actions";

function Landing() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    if (types.length === 0 && pokemons.length === 0) {
      dispatch(getType());
      dispatch(getPokemons());
    }
  }, []);

  return (
    <div className="Landing">
      <div className="Landing__container">
        <div className="Landing__container__title">
          <h1>Henry Pokemon</h1>
        </div>
        <div className="Landing__container__button">
          <Link to="/home">
            <button>Start</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;

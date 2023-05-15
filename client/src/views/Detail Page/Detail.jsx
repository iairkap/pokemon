import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonByID, setPokemonsDetail } from "../../redux/actions/actions";
import Loading from "../../assets/loading";
import { Link } from "react-router-dom";

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

  return (
    <div className="PokemonDetailContainer">
      <div onClick={() => dispatch(setPokemonsDetail())}>
        <Link to="/home">
          <button className="BackButton">Back</button>
        </Link>
      </div>
      {!pokemonDetail && <Loading />}
      {pokemonDetail && (
        <div className="PokemonDetail">
          <div>
            <img src={pokemonDetail.image} alt={pokemonDetail.name} />
          </div>
          <div className="PokemonDetailInfo">
            <h1>{pokemonDetail.name}</h1>
            <h3>
              Types:{" "}
              {pokemonDetail.types.map((type, index) => (
                <p key={index}>{type}</p>
              ))}
            </h3>
            <h3>Attack: {pokemonDetail.attack}</h3>
            <h3>Defense: {pokemonDetail.defense}</h3>
            <h3>Speed: {pokemonDetail.speed}</h3>
            <h3>Height: {pokemonDetail?.height}</h3>
            <h3>Weight: {pokemonDetail?.weight}</h3>
            <h3>Life: {pokemonDetail.hp}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;

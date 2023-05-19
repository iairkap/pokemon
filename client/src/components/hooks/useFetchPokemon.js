import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions/actions";

export const useFetchPokemons = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.filterAndOrderPokemons);

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(getPokemons());
    }
  }, [dispatch, pokemons]);

  return pokemons;
};

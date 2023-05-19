import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/actions/actions";
import styles from "./Pagination.module.css";
import { usePage } from "../../usePage";
import { useFetchPokemons } from "../../components/hooks/useFetchPokemon";
import { useFetchTypes } from "../hooks/useFetchTypes";

const Pagination = () => {
  const dispatch = useDispatch();

  const pokemons = useFetchPokemons();
  const numberOfPokemonsPerPage = 12;
  const currentPage = useSelector((state) => state.currentPage);

  const { page, countPage } = usePage(
    pokemons,
    numberOfPokemonsPerPage,
    currentPage
  );

  return (
    <div className={styles.PageNavigator}>
      <button
        className={styles.Previous}
        onClick={() =>
          currentPage > 0 && dispatch(setCurrentPage(currentPage - 1))
        }
      >
        Previous
      </button>
      <div className={styles.PageNumber}>
        {countPage.length > 0 &&
          countPage.map((num) => {
            return (
              <button
                disabled={false}
                onClick={(event) =>
                  dispatch(setCurrentPage(event.target.value - 1))
                }
                value={num}
                key={num}
              >
                {num}
              </button>
            );
          })}
      </div>
      <button
        className={styles.Next}
        onClick={() =>
          currentPage < countPage.length - 1 &&
          dispatch(setCurrentPage(currentPage + 1))
        }
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

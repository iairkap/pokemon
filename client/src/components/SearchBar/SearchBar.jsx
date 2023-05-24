import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonByName,
  setPokemons,
  clearPokemons,
} from "../../redux/actions/actions";
import styles from "./SearchBar.module.css";
import Loading from "../../assets/loading";
import Card from "../Card/Card";
import { WhoIsThatPokemon } from "../../assets/WhoIsThatPokemon";

function SearchBar() {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);
  const [search, setSearch] = useState("");
  const [openResult, setOpenResult] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  function setNamePokemonForDB(name) {
    const lowerCaseName = name.toLowerCase();
    const eliminateSpaces = lowerCaseName.trim().split(" ").join("-");
    return eliminateSpaces;
  }

  function setNamePokemonForClient(name) {
    const lowerCaseName = name.toLowerCase();
    const eliminateHyphens = lowerCaseName.trim().split("-").join(" ");
    return eliminateHyphens;
  }
  useEffect(() => {
    if (pokemon[0]) setIsLoading(false);
  }, [pokemon]);

  function handleSearch() {
    handleOpenResult();
    setSearch("");
    dispatch(clearPokemons());
    setIsLoading(true);
    dispatch(getPokemonByName(setNamePokemonForDB(search)));
  }

  function handleInput(event) {
    if (event.target.value) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    setSearch(event.target.value);
  }

  function handleOpenResult() {
    if (openResult && pokemon[0]) dispatch(setPokemons(pokemon));
    openResult ? setOpenResult(false) : setOpenResult(true);
  }

  function handleEnterSearch(event) {
    if (event.key === "Enter" && search.length > 0) {
      handleSearch();
    }
  }
  function handleInputFocus() {
    setIsExpanded(true);
  }

  function handleInputBlur() {
    setIsExpanded(false);
  }

  return (
    <div className={styles.SearchBarContainer}>
      <div className={styles.SearchBar}>
        <input
          className={`${styles.SearchBarInput} ${
            isExpanded ? styles.SearchBarInputExpanded : ""
          }`}
          onChange={handleInput}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          type="search"
          placeholder="Search Pokemon"
          value={search}
          onKeyDown={handleEnterSearch}
        />
        <button
          className={styles.SearchBarButton}
          disabled={buttonDisabled}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {openResult && (
        <div className={styles.SearchResult}>
          <div onClick={handleOpenResult}>
            <span>x</span>
          </div>
          {isLoading && <Loading />}
          {pokemon[0]?.message && (
            <div className={styles.SearchResultMessage}>
              <span>{pokemon[0].message}</span>
            </div>
          )}
          {pokemon[0]?.message === "Not found" ? (
            <WhoIsThatPokemon />
          ) : (
            pokemon.map(({ id, image, name, Types }) => {
              return (
                <Card
                  key={id}
                  id={id}
                  image={image}
                  name={setNamePokemonForClient(name)}
                  types={Types}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
export default SearchBar;

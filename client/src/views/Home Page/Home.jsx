import { useState } from "react";
import { useSelector } from "react-redux";
import { usePage } from "../../usePage";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Loading from "../../assets/loading";
import FilterAndOrder from "../../components/FilterAndOrder/FilterAndOrder";
import styles from "./Home.module.css";
import { useFetchPokemons } from "../../components/hooks/useFetchPokemon";
import { useFetchTypes } from "../../components/hooks/useFetchTypes";
import Pagination from "../../components/Pagination/Pagination";
import NavBar from "../../components/NavBar/NavBar";
import Menu from "../../components/Menu/Menu";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  const pokemons = useFetchPokemons();
  const types = useFetchTypes();
  const currentPage = useSelector((state) => state.currentPage);
  const numberOfPokemonsPerPage = 12;
  const [openMenu, setOpenMenu] = useState(false);

  function handleBotonMenu() {
    openMenu ? setOpenMenu(false) : setOpenMenu(true);
  }

  const { page, countPage } = usePage(
    pokemons,
    numberOfPokemonsPerPage,
    currentPage
  );

  console.log(pokemons);
  return (
    <div className={styles.Page}>
      <div className={styles.Page__header}>
        <NavBar
          handleBotonMenu={handleBotonMenu}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />
        {openMenu && <Menu handleBotonMenu={handleBotonMenu} />}
      </div>
      <div className={styles.Page__container}>
        <SearchBar />

        <FilterAndOrder />
        {pokemons.length === 0 && <Loading />}
        <CardsContainer pokemons={page} />
      </div>
      <Pagination />
    </div>
  );
};

export default Home;

/* 
const Home = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const pokemons = useSelector((state) => state.filterAndOrderPokemons);
  const types = useSelector((state) => state.types);
  const numberOfPokemonsPerPage = 12;

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(getPokemons());
    }
  }, [dispatch, pokemons]);

  useEffect(() => {
    if (types.length === 0) {
      dispatch(getType());
    }
  }, [dispatch, types]);

  const [openMenu, setOpenMenu] = useState(false);

  function handleBotonMenu() {
    openMenu ? setOpenMenu(false) : setOpenMenu(true);
  }

  const { page, countPage } = usePage(
    pokemons,
    numberOfPokemonsPerPage,
    currentPage
  );

  console.log(pokemons);
  return (
    <div className={styles.Page}>
      <div className={styles.Page__container}>
        <FilterAndOrder />
        <h1>Pagina del Home</h1>
        {pokemons.length === 0 && <Loading />}
        <CardsContainer pokemons={page} />
      </div>
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
    </div>
  );
};

export default Home;
 */

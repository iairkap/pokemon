import React from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

function Menu({ handleBotonMenu, openMenu }) {
  const menuClass = openMenu ? styles.Menu_open : styles.Menu_close;
  return (
    <div className={`${styles.Menu} ${menuClass}`}>
      <div className={styles.Menu_container}>
        <div className={styles.x} onClick={handleBotonMenu}>
          x
        </div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/create">Create</Link>
          </li>
          <li>
            <Link to="/">Exit</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;

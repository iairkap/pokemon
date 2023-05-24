import React from "react";
import styles from "../views/Form Page/FormPage.module.css";

function Menu({ handleBotonMenu, openMenu }) {
  return (
    <div className={styles.Menu} onClick={handleBotonMenu}>
      <div className={styles.Menu__line}></div>
      <div className={styles.Menu__line}></div>
      <div className={styles.Menu__line}></div>
    </div>
  );
}

export default Menu;

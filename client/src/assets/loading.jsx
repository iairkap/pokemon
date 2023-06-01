import React from "react";
import syles from "./loading.module.css";

function Loading() {
  return (
    <div className={syles.container}>
      <div className={syles.pokeball}>
        <div className={syles.pokeball__button}></div>
      </div>
    </div>
  );
}

export default Loading;

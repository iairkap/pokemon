import React from "react";
import syles from "./loading.module.css";

//quiero hacer un loading que tenga forma de pokeball y que gire
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

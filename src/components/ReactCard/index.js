import React from "react";
import "./style.css";

function ReactCard(props) {
  return (
    <div
        className="card"
        id={props.id}
        style={{ backgroundImage: `url("${props.image}")` }}
        onClick={() => props.handleClick(props.id)}
    />
  );
}

export default ReactCard;

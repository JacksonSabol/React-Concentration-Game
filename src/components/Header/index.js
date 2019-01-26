import React from "react";
import "./style.css";

function Header(props) {
  return (
    <nav className="header">
      <ul>
        <li><span><img className="reactLogo" src="./ReactLogoTranspBG.png"/></span><a href="/">{props.title}</a></li>
        <li>{props.message}</li>
        <li>Score: {props.score} | Top Score: {props.topScore}</li>
      </ul>
    </nav>
  );
}

export default Header;

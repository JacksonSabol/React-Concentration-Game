import React from "react";
import "./style.css";

function Instructotron() {
    return (
        <div className="instructotron">
            <p className="game-title">React Concentration Game!</p>
            <p className="game-instructions">Click on an image of a React.js Component to earn points.<br />But don't click on any more than once!</p>
        </div>
    );
}

export default Instructotron;
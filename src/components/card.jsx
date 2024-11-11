// Card.jsx
import React from "react";
import "./card.css";

const Card = ({ character, isFlipped, onClick }) => (
  <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={onClick}>
    {isFlipped ? (
      <img src={character.image} alt={character.name} className="card-image" />
    ) : (
      <div className="card-back"></div>
    )}
  </div>
);

export default Card;

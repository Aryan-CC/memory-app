// App.jsx
import React, { useState, useEffect } from "react";
import Card from "./components/card";
import "./App.css";

const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  // Load the cards with characters from the Star Wars API
  useEffect(() => {
    initializeGame();
  }, []);

  //Add a card to the grid. The card should have a symbol on one side
  // Initialize game state
  const initializeGame = async () => {
    const res = await fetch("https://akabab.github.io/starwars-api/api/all.json");
    const characters = await res.json();
    const selectedCharacters = characters.slice(0, 8);
    const cardPairs = [...selectedCharacters, ...selectedCharacters]
      .sort(() => Math.random() - 0.5) // Shuffle the cards
      .map((character) => ({ ...character, isFlipped: false }));
    setCards(cardPairs);
    setFlippedIndices([]);
    setMatchedCards([]);
    setGameWon(false);
  };

  // Handle card click
  const handleCardClick = (index) => {
    // Prevent clicking if two cards are already flipped or if the card is already matched
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedCards.includes(cards[index].id)) {
      return;
    }

    // Flip the card
    setFlippedIndices((prev) => [...prev, index]);

    // Check if two cards are flipped
    if (flippedIndices.length === 1) {
      const firstCard = cards[flippedIndices[0]];
      const secondCard = cards[index];

      // Check for match
      if (firstCard.id === secondCard.id) {
        setMatchedCards((prev) => [...prev, firstCard.id]);
      }

      // Reset flipped cards after a delay if they don't match
      setTimeout(() => {
        setFlippedIndices([]);
      }, 1000);
    }
  };

  // Check if the game is won
  useEffect(() => {
    if (matchedCards.length === cards.length / 2) {
      setGameWon(true);
    }
  }, [matchedCards]);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      {gameWon ? (
        <div className="win-message">
          <h2>Congratulations! You Won!</h2>
        </div>
      ) : null}

      <div className="card-grid">
        {cards.map((card, index) => (
          <Card
            key={index}
            character={card}
            isFlipped={flippedIndices.includes(index) || matchedCards.includes(card.id)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      <button onClick={initializeGame} className="reset-button">
        Reset Game
      </button>
    </div>
  );
};

export default App;

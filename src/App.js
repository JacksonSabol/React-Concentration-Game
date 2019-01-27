import React, { Component } from "react";
import Header from "./components/Header";
import Instructotron from "./components/Instructotron";
import Wrapper from "./components/Wrapper";
import ReactCard from "./components/ReactCard";
import Footer from "./components/Footer";
import cards from "./cards.json";

class App extends Component {
  // Setting the states for the game this.state.cards to the 'cards' json array
  // When defining object properties with ES6, if the object's key and value have the same name, we can omit the colon
  state = {
    cards, // Set this.state.cards to the 'cards' json array
    score: 0, // Set this.state.score to 0 as a default to start the game
    topScore: 0, // Set this.state.topScore to 0 as a default to start the game
    message: "Click an image to begin!" // Set this.state.message to an opening message
  };

  // Life-cycle method that's the React.js equivalent of $(document).ready() - do work once the components mount
  componentDidMount() {
    // Set this.state.cards to rearrange the cards on the page - "Shuffle the Deck" of ReactCards
    this.setState({ cards: this.shuffleDeck(this.state.cards) });
  }

  // Function to handle the click of a card
  handleCardClick = id => {
    // Instantiate a variable to hold a default value of 'chosen' equal to false
    let choseCorrectly = false;
    // When a card is clicked, check to see if it has been clicked before - check this.state.cards[i].clicked ? true : false
    // Iterate through the current cards (this.state.cards) using the .map() method
    // Assign a variable to hold the results, because .map() creates a new array with the results and does not change the original array
    const updatedDeck = this.state.cards.map(card => {
      // Use a conditional to compare the id of the card clicked to the id's of all of the cards in this.state.cards
      if (card.id === id) {
        // If the value of 'clicked' is 'false' on the object matching the id of the card clicked...
        if (!card.clicked) {
          // ...set it to 'true'
          card.clicked = true;
          // Reassign the tracking variable choseCorrectly to 'true', meaning the player correctly chose an unclicked card
          choseCorrectly = true;
        }
        // If this condition is not met, the default choseCorrectly value of 'false' is conserved, so the player did not choose correctly
      }
      // Return the card parameter for each of this.state.cards to the updatedDeck array
      return card;
    });
    // Use choseCorrectly to handle this.state.score and this.state.topScore - i.e. invoke the corresponding built-in functions depending on whether player chose correctly
    // condition ?           true                               false         
    choseCorrectly ? this.handleCorrectChoice(updatedDeck) : this.handleIncorrectChoice(updatedDeck);
  };

  // Function to handle this.state.score and this.state.topScore when a player chooses a previously unclicked card
  handleCorrectChoice = updatedCards => {
    // Instantiate a variable to point to this.state.score so it can be incremented
    let newScore = this.state.score;
    newScore++
    // Instantiate a variable to compare the new score to this.state.topScore to update the top score
    // Use Math.max to compare without overwriting the value of this.state.topScore, since that needs to be conserved when a player wins/loses
    // https://www.w3schools.com/jsref/jsref_max.asp
    let newTopScore = Math.max(newScore, this.state.topScore);
    // Check to see if the newTopScore is equal to the maximum score possible (12) - win condition
    if (newTopScore === 12) {
      this.setState({
        // Set this.state.score to 0 to 'restart' the game without losing track of the topScore
        score: 0,
        // Set this.state.topScore to the maximum possible score
        topScore: newTopScore,
        // Set this.state.message to a 'win' message
        message: "You Win! Congratulations!",
        // Set this.state.cards to the return array of this.resetGame() to change all values of 'clicked' to false
        cards: this.resetGame(updatedCards)
      })
    }
    // Otherwise, continue with the game
    else {
      // Update the states and shuffle the deck of cards
      this.setState({
        // Set this.state.cards to the shuffled cards with the updated value of 'clicked'
        cards: this.shuffleDeck(updatedCards),
        // Set this.state.score to the new score
        score: newScore,
        // Set this.state.topScore to the new top score
        topScore: newTopScore,
        // Set this.state.message to "You Guessed Correctly!"
        message: "You Guessed Correctly!"
      })
    }
    // State change will re-render the components
  }

  // Function to handle this.state.score when a player incorrectly chooses a previously clicked card
  handleIncorrectChoice = updatedCards => {
    // Since player chose incorrectly, the game will need to be reset - i.e. all values of 'clicked' in this.state.cards need to be set to false
    this.setState({
      // Set this.state.cards to the return array of this.resetGame() to change all values of 'clicked' to false
      cards: this.resetGame(updatedCards),
      // Set this.state.score to 0 to 'restart' the game without losing track of the topScore
      score: 0,
      // Set this.state.message to "You Guessed Incorrectly!"
      message: "You Guessed Incorrectly!"
    })
  }

  // Function to handle "Shuffling the Deck" to rearrange the cards on the DOM
  shuffleDeck = deck => {
    // Assign a variable to receive the "shuffled" deck of cards
    // array.sort(compareFunction) https://www.w3schools.com/jsref/jsref_sort.asp
    // https://stackoverflow.com/a/43235780/10503606
    let newDeck = deck.sort(() => Math.random() - 0.5); // * Note to self: test const versus let on newDeck
    return newDeck; // There's no need to set this.state.cards to the newDeck because we can call this function in every other function that does setState, thereby re-rendering the components
  };

  // Function to handle resetting the game after a player makes an incorrect choice or wins the game
  resetGame = deck => {
    // Iterate through all of the card objects passed by the handle choice functions using the .map() method - set all values of 'clicked' to false
    // Assign a variable to hold the results, because .map() creates a new array with the results and does not change the original array
    // Use JSX Spread attribute to only update the key of 'clicked' to false https://zhenyong.github.io/react/docs/jsx-spread.html
    const resetDeck = deck.map(card => ({ ...card, clicked: false }));
    // Shuffle the reset deck and return it to the handle choice functions function which changes state to start the game over
    return this.shuffleDeck(resetDeck);
  };

  // Render the components
  render() {
    return (
      <div>
        <Header
          title="Concentration Game" // Send the title to the props of Header
          message={this.state.message} // Send this.state.message to the props of Header to display Correct! or Incorrect! messages
          score={this.state.score} // Send this.state.score to the props of Header for display
          topScore={this.state.topScore} // Send this.state.topScore to the props of Header for display
        />
        <Instructotron /> {/* Renders a Jumbotron-style banner with instructions on how to play the game */}
        <Wrapper>
          {
            this.state.cards.map(card => ( // map() this.state.cards to pass each object in the array to the ReactCard component
              <ReactCard
                id={card.id} // Pass the id to reference later when a card is 'clicked'
                image={card.image} // Pass the image file path to fill the background of the div in the ReactCard component
                handleClick={this.handleCardClick} // Pass the onClick function of this.handleCardClick to handle each card being clicked
              />
            ))
          }
        </Wrapper >
        <Footer /> {/* Renders a footer with the info about the build of the game */}
      </div>
    );
  }
}

export default App;

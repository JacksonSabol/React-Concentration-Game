import React, { Component } from "react";
import Header from "./components/Header";
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
    // Change the this.state.cards here to rearrange the cards on the page - "Shuffle the Deck" of ReactCards
    // Randomize this.setState({ cards }); - this.shuffleDeck();
  }

  // Function to handle the click of a card
  handleCardClick = id => {
    // When a card is clicked, check to see if it has been clicked before - check this.state.cards[i].clicked ? true : false
    // Instantiate a variable to hold a default value of 'chosen' equal to false
    // Iterate through the current cards (this.state.cards) .map() method
    // Compare the id of the card clicked to the id's of all of the cards in this.state.cards
    // If the value of 'chosen' is 'false' on the object matching the id of the card clicked, set it to 'true'
    // Reassign the variable tracking 'chosen' to 'true', meaning the player correctly chose an unclicked card
    // Otherwise, the default 'chosen' value of false is conserved, and the player did not choose correctly
    // Use this variable to handle this.state.score and this.state.topScore, depending on whether player chose correctly
  };

  // Function to handle this.state.score and this.state.topScore when a player chooses a previously unclicked card
  handleCorrectChoice = updatedCards => {
    // Instantiate a variable to point to this.state.score so it can be incremented
    // Compare the new score to this.state.topScore to update the top score
    // Instantiate a variable to point to an updated this.state.topScore
    // Set this.state.score to the new score
    // Set this.state.topScore to the new top score
    // "Shuffle the Deck" of ReactCards - this.shuffleDeck();
    // Set this.state.message to "You Guessed Correctly!"
    // State change will re-render the components
  }

  // Function to handle this.state.score when a player incorrectly chooses a previously clicked card
  handleIncorrectChoice = updatedCards => {
    // Since player chose incorrectly, the game will need to be reset - i.e. all values of 'clicked' in this.state.cards need to be set to false
    // Set this.state.score to 0 to 'restart' the game without losing track of the topScore
    // Set this.state.message to "You Guessed Incorrectly!"
    // Invoke a function to change all values of 'clicked' to false - this.resetGame();
  }

  // Function to handle "Shuffling the Deck" to rearrange the cards on the DOM
  shuffleDeck = deck => {
    // Assigning a variable to receive the "shuffled" deck of cards
    // Randomly sort the deck using a compareFunction to handle sorting numbers
    // array.sort(compareFunction) https://www.w3schools.com/jsref/jsref_sort.asp
    // Set this.state.cards to the new deck
  };

  // Function to handle resetting the game after a player makes an incorrect choice or wins the game
  resetGame = deck => {
    // Instantiate a variable to receive the updated deck where all values of 'clicked' are set to false
    // Iterate through all of the card objects in this.state.cards and set 'clicked' to false .map()
    // Shuffle the reset deck and return it to start the game over - this.shuffleDeck();
  };

  // Render the components
  render() {
    return (
      <div>
        <Header /> {/* Renders a header with the title of the game */}
        {/* Send this.state.message to a component here */}
        {/* Send this.state.score and this.state.topScore to a component here */}
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

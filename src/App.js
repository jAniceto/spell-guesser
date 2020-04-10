import React from 'react';
import spells from './data/spells.json'
import './css/skeleton.css'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.spells = spells.spells;
    this.totalScore = this.spells.length;
    this.state = {
      spell: "",
      guess: "",
      score: 0,
      count: 0
    };
  }

  render() {
    return (
      <div className="App">

        <div className="header">
          <img className="App-logo" alt="logo" src={process.env.PUBLIC_URL + '/hogwarts-logo.png'} /> 

          <div>
            <h1>Guess the Spell</h1>
          </div>
        </div>

        <div className="content">

          <div id="question">
            <p><code>{this.state.spell.type}</code> {this.state.spell.effect}</p>
          </div>

          <div id="answer">
            <input type="text" value={this.state.guess} onChange={this.changeInput} ref={(ip) => this.answerInput = ip} />
          </div>

          <button onClick={this.passQuestion}>Pass</button>

          <div id="score">
            <p>
              Current score: {this.state.score} out of {this.state.count}
              <br />
              <small>Max score: {this.totalScore}</small>  
            </p>
          </div>

        </div>
        
      </div>
    );
  }

  componentDidMount() {
    this.getRandomQuestion();
  }

  getRandomQuestion = () => {
    let spell = this.spells[Math.floor(Math.random() * this.spells.length)];
    console.log(spell);
    this.setState({
      spell: spell,
      guess: ""
    });
  }

  changeInput = (event) => {
    this.setState({
      guess: event.target.value
    }, this.checkGuess);
  }

  passQuestion = () => {
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      }
    }, this.getRandomQuestion, this.answerInput.focus());
  }

  checkGuess = () => {
    if (this.state.guess.toLowerCase() === this.state.spell.incantation.toLowerCase()) {
      // Correct answer
      this.setState(prevState => {
        return {
          score: prevState.score + 1,
          count: prevState.count + 1
        }
      }, this.getRandomQuestion);
    } 
  }

}

export default App;

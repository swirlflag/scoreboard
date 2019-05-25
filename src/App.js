import React from 'react';
import './App.css';

const Header = (props) => {
  console.log(props);
  //destruct assignment - 해체할당문법
  const {title, totalPlayers} = props;
  return(
    <header>
      <h1>{title}</h1>
      <span className='stats'>Players: {totalPlayers}</span>
    </header>
  )
}

const Player = (props) => (
  <div className='player'>
    <span className='player-name'>
      <button className='remove-player' onClick={() => props.removePlayer(props.id)}>x</button>
    </span>
    <span className='player-name'>{props.name}</span>
    <Counter/>
  </div>
);

class Counter extends React.Component {
  state = {
    score:0
  }

  constructor(props){
    super(props);
    //1)this.incrementScore = this.incrementScore.bind(this);
  }

  changeScore = (delta) => {
    //2)arrow 펑션안의 this는 lexical this
    console.log(this);

    //state를 변경하는방법
    //this.setState({score: this.state.score+1});
    //merge 된다. : 기존 속성은 그대로 유지
    //비동기로 처리
    this.setState(prevState => ({
      score: prevState.score + delta
    }));
  }

  render() {
    return (
      <div className='counter'>
        <button className='counter-action decrement' onClick={()=> this.changeScore(-1)}> - </button>
        <span className='counter-score'>{this.state.score}</span>
        <button className='counter-action increment' onClick={()=> this.changeScore(1)}> + </button>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    players:[
      {name:'name1', id:1},
      {name:'name2', id:2},
      {name:'name3', id:3},
      {name:'name4', id:4},
    ]
  }

  //1)player 삭제 콜백 펑션 정의
  handleRemovePlayer = (id) => {
    console.log(id);

    this.setState(prevState => ({
      players: prevState.players.filter(item => item.id !== id)
    }))
  }

  render() {
    return (
      <div className='scoreboard'>
        <Header title='my scoreboard' totalPlayers={11}/>

        {
          this.state.players.map(player => (
            <Player name={player.name} key={player.id} id={player.id} removePlayer={this.handleRemovePlayer}/>
          ))
        }
      </div>
    );
  }
}
export default App;

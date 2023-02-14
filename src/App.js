import './App.css';
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from 'react';
import GameList from './GameList'
import NavBar from './NavBar';
import CreateGameForm from './CreateGameForm';
import UpdateGameForm from './UpdateGameForm';

function App() {

  const [games, setGames] = useState([])
  const [postGameFormData, setPostGameFormData] = useState({})
  const [updateGameFormData, setUpdateGameFormData] = useState({})

  useEffect(() => {
    fetch("http://localhost:3000/games")
    .then(response => response.json())
    .then(gameData => setGames(gameData))
  }, [])

  function createGame(event){
    event.preventDefault()
    fetch('http://localhost:3000/games', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postGameFormData)
    })
    .then(response => response.json())
    .then(newGame => setGames([...games, newGame]))
  }

  function handleChangeForPost(event){
    if(event.target.name === 'release_year'){
      setPostGameFormData({...postGameFormData, [event.target.name]: Number(event.target.value)})
    }
    else{
      setPostGameFormData({...postGameFormData, [event.target.name]: event.target.value})
    }
  }

  function updateGame(id){
    console.log(id)
    console.log(updateGameFormData)
    fetch(`http://localhost:3000/games/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateGameFormData)
    })
    .then(response => response.json())
    .then(updatedGame => console.log(updatedGame))
  }

  function handleChangeForUpdate(event){
    if(event.target.name === 'release_year'){
      setUpdateGameFormData({ ...updateGameFormData, [event.target.name]: Number(event.target.value)})
    }
    else{
      setUpdateGameFormData({ ...updateGameFormData, [event.target.name]: event.target.value })
    }
  }

  function filterForDelete(id){
    setGames(games.filter(game => {
      return game.id !== id
    }))
  }

  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <Switch>
          <Route exact path="/">
            <h1>WELCOME TO THE GAMES APP!</h1>
          </Route>
          <Route path="/games">
            <GameList games={games} filterForDelete={filterForDelete}/>
          </Route>
          <Route path="/create_game">
            <CreateGameForm createGame={createGame} handleChangeForPost={handleChangeForPost}/>
          </Route>
          <Route path="/update_game">
            <UpdateGameForm games={games} updateGame={updateGame} handleChangeForUpdate={handleChangeForUpdate}/>
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;

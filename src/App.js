import './App.css';
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from 'react';
import GameList from './GameList'
import NavBar from './NavBar';
import CreateGameForm from './CreateGameForm';
import UpdateGameForm from './UpdateGameForm';

function App() {

  // State for all of the games from the database
  const [games, setGames] = useState([])

  // State for keeping track of the form data for a new game to be created
  const [postGameFormData, setPostGameFormData] = useState({})

  // State for keeping track of the form data for a game to be updated
  const [updateGameFormData, setUpdateGameFormData] = useState({})

  // Makes a GET request to get the data for all of the games from the database.
  // Updates the games state to contain the data for all of the games from the database.
  useEffect(() => {
    fetch("http://localhost:3000/games")
    .then(response => response.json())
    .then(gameData => setGames(gameData))
  }, [])

  // Creates a new game - persists in the backend,
  // and updates the games state on the frontend to include the newly created game
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

  // Updates the state containing the form data for the new game to be created
  function handleChangeForPost(event){
    if(event.target.name === 'release_year'){
      // The release_year column's value needs to be an integer, so we should convert the value to a number
      setPostGameFormData({...postGameFormData, [event.target.name]: Number(event.target.value)})
    }
    else{
      setPostGameFormData({...postGameFormData, [event.target.name]: event.target.value})
    }
  }

  // Updates a game - persists in the backend,
  // and updates the games state on the frontend to update the specific game that needs to be updated
  function updateGame(id){
    fetch(`http://localhost:3000/games/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateGameFormData)
    })
    .then(response => response.json())
    .then(updatedGame => setGames(games.map(game => {
      if(game.id === Number(id)){
        return updatedGame
      }
      else{
        return game
      }
    })))
  }

  // Updates the state containing the form data for the new game to be updated
  function handleChangeForUpdate(event){
    if(event.target.name === 'release_year'){
      setUpdateGameFormData({ ...updateGameFormData, [event.target.name]: Number(event.target.value)})
    }
    else{
      setUpdateGameFormData({ ...updateGameFormData, [event.target.name]: event.target.value })
    }
  }

  // Handles front-end functionality for a DELETE request
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

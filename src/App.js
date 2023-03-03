import './App.css';
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from 'react';
import GameList from './GameList'
import NavBar from './NavBar';
import CreateGameForm from './CreateGameForm';
import UpdateGameForm from './UpdateGameForm';
import Login from './Login';
import LoggedOutNavBar from "./LoggedOutNavBar"
import Signup from "./Signup"

function App() {

  // State for all of the games from the database
  const [games, setGames] = useState([])

  // State for keeping track of the form data for a new game to be created
  const [postGameFormData, setPostGameFormData] = useState({})

  // State for keeping track of the form data for a game to be updated
  const [updateGameFormData, setUpdateGameFormData] = useState({})

  // State for a user. Initially null, until the user logs in
  const [user, setUser] = useState(null)

  // State for keeping track of the form data for login
  const [loginFormData, setLoginFormData] = useState({})

  // State for keeping track of the form data for signup
  const [signupFormData, setSignupFormData] = useState({})
  

  // Makes a GET request to get the data for all of the games from the database.
  // Updates the games state to contain the data for all of the games from the database.
  useEffect(() => {
    fetch("/games")
    .then(response => response.json())
    .then(gameData => setGames(gameData))
  }, [])

  // Creates a new game - persists in the backend,
  // and updates the games state on the frontend to include the newly created game
  function createGame(event){
    event.preventDefault()
    fetch('/games', {
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
    fetch(`/games/${id}`, {
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

  // Handle user log in
  function onLogin(event){
    event.preventDefault()
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginFormData)
    })
    .then(response => {
      if(response.ok){
        response.json().then(userData => setUser(userData))
      }
      else if(response.status === 401){
        alert("Error: Invalid username or password! Please try again!")
      }
      else{
        alert(`Error: ${response.status} ${response.statusText}`)
      }
    })
  }

  // Check if user is currently logged in
  useEffect(() => {
    fetch("/me")
    .then(response => {
      if(response.ok){
        response.json().then(userData => setUser(userData))
      }
    })
  }, [])

  function updateLoginFormData(event){
    setLoginFormData({...loginFormData, [event.target.name]: event.target.value})
  }

  function onLogout(){
    fetch("/logout", {
      method: "DELETE"
    })
    .then(response => {
      if(response.ok){
        setUser(null)
      }
    })
  }

  function updateSignupFormData(event){
    setSignupFormData({...signupFormData, [event.target.name]: event.target.value})
  }

  function onSignup(event){
    event.preventDefault()
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signupFormData)
    })
    .then(response => {
      if(response.ok){
        response.json().then(userData => setUser(userData))
      }
      else if(response.status === 422){
        alert("Error: Username already exists or invalid Username! Please try again!")
      }
      else{
        alert(`Error: ${response.status} ${response.statusText}`)
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          user ?
          <>
            <NavBar/>
            <button onClick={onLogout}>Log Out</button>
            {`Welcome ${user.username}!`}
            <br/>
          </> :
          <LoggedOutNavBar/>
        }
        <Switch>
          <Route exact path="/">
            <h1>WELCOME TO THE GAMES APP!</h1>
          </Route>
          <Route path="/login">
            {
              user ?
              null : 
              <Login onLogin={onLogin} updateLoginFormData={updateLoginFormData}/>
            }
          </Route>
          <Route path="/signup">
            {
              user ?
              "Please log out before signing up for an account" :
              <Signup onSignup={onSignup} updateSignupFormData={updateSignupFormData} />
            }
          </Route>
          <Route path="/games">
            {user ? <GameList games={games} filterForDelete={filterForDelete}/> : "Please log in to view games"}
          </Route>
          <Route path="/create_game">
            {user ? <CreateGameForm createGame={createGame} handleChangeForPost={handleChangeForPost}/> : "Please log in to create a game"}
          </Route>
          <Route path="/update_game">
            {user ? <UpdateGameForm games={games} updateGame={updateGame} handleChangeForUpdate={handleChangeForUpdate}/> : "Please log in to update a game"}
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;

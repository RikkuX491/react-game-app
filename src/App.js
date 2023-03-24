import './App.css';
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from 'react';
import ReviewList from './ReviewList'
import NavBar from './NavBar';
import CreateReviewForm from './CreateReviewForm';
import UpdateGameForm from './UpdateGameForm';
import Login from './Login';
import LoggedOutNavBar from "./LoggedOutNavBar"
import Signup from "./Signup"

function App() {

  // State for all of the review from the database
  const [reviews, setReviews] = useState([])

  // State for all of the games from the database
  const [games, setGames] = useState([])

  // State for keeping track of the form data for a new review to be created
  const [postReviewFormData, setPostReviewFormData] = useState({
    rating: 1
  })

  // State for keeping track of the form data for a review to be updated
  const [updateReviewFormData, setUpdateReviewFormData] = useState({})

  // State for a user. Initially null, until the user logs in
  const [user, setUser] = useState(null)

  // State for keeping track of the form data for login
  const [loginFormData, setLoginFormData] = useState({})

  // State for keeping track of the form data for signup
  const [signupFormData, setSignupFormData] = useState({})

  /*
    GET requests for /reviews and /games
  */
  
  // Makes a GET request to get the data for all of the reviews from the database.
  // Sets the reviews state to contain the data for all of the reviews from the database.
  useEffect(() => {
    fetch("/reviews")
    .then(response => response.json())
    .then(reviewData => setReviews(reviewData))
  }, [])

  // Makes a GET request to get the data for all of the games from the database.
  // Sets the games state to contain the data for all of the games from the database.
  useEffect(() => {
    fetch("/games")
    .then(response => response.json())
    .then(gameData => {
      setGames(gameData)
      setPostReviewFormData(postReviewFormData => {
        return {...postReviewFormData, game_id: gameData[0].id}
      })
    })
  }, [])

  /*
    POST request for /reviews
  */

  // Creates a new review - persists in the backend,
  // and updates the reviews state on the frontend to include the newly created review
  function createReview(event){
    event.preventDefault()
    fetch('/reviews', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postReviewFormData)
    })
    .then(response => {
      if(response.ok){
        response.json().then(newReview => {
          setReviews(reviews => [...reviews, newReview])
          setUser(user => {
            return {...user, reviews: [...user.reviews, newReview]}
          })
        })
      }
      else if(response.status === 422){
        response.json().then(errorData => alert(`Error: ${errorData.errors.join(',')}`))
      }
      else{
        alert(`${response.status}: ${response.statusText}`)
      }
    })
  }

  // Updates the state containing the form data for the new review to be created
  function handleChangeForPost(event){
      // The game_id and rating column's value needs to be an integer, so we should convert the value to a number
      setPostReviewFormData(postReviewFormData => {
        return {...postReviewFormData, [event.target.name]: Number(event.target.value)}
      })
  }

  /*
    PATCH request for /reviews/:id
  */

  // Updates a game - persists in the backend,
  // and updates the games state on the frontend to update the specific game that needs to be updated
  // function updateGame(id){
  //   fetch(`/games/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(updateGameFormData)
  //   })
  //   .then(response => response.json())
  //   .then(updatedGame => setGames(games.map(game => {
  //     if(game.id === Number(id)){
  //       return updatedGame
  //     }
  //     else{
  //       return game
  //     }
  //   })))
  // }

  // Updates the state containing the form data for the new game to be updated
  // function handleChangeForUpdate(event){
  //   if(event.target.name === 'release_year'){
  //     setUpdateGameFormData({ ...updateGameFormData, [event.target.name]: Number(event.target.value)})
  //   }
  //   else{
  //     setUpdateGameFormData({ ...updateGameFormData, [event.target.name]: event.target.value })
  //   }
  // }

  /*
    DELETE request for /reviews/:id
  */

  // Delete's a User's review from the backend and handles front-end functionality for a DELETE request for when a User DELETEs one of their reviews.
  function deleteReview(id){
    fetch(`/reviews/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      setUser(user => {
        return {...user, reviews: user.reviews.filter(review => {
          return review.id !== id
        })}
      })
    })
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
        response.json().then(userData => {
          setUser(userData)
          setPostReviewFormData(postReviewFormData => {
            return {...postReviewFormData, user_id: userData.id}
          })
        })
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
        response.json().then(userData => {
          setUser(userData)
          setPostReviewFormData(postReviewFormData => {
            return {...postReviewFormData, user_id: userData.id}
          })
        })
      }
    })
  }, [])

  function updateLoginFormData(event){
    setLoginFormData(loginFormData => {
      return {...loginFormData, [event.target.name]: event.target.value}
    })
  }

  // Logs the user out from the website
  function onLogout(){
    fetch("/logout", {
      method: "DELETE"
    })
    .then(response => {
      if(response.ok){
        setUser(null)
        setPostReviewFormData(postReviewFormData => {
          delete postReviewFormData.user_id
          return {...postReviewFormData}
        })
      }
    })
  }

  function updateSignupFormData(event){
    setSignupFormData(signupFormData => {
      return {...signupFormData, [event.target.name]: event.target.value}
    })
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
        response.json().then(userData => {
          setUser(userData)
          setPostReviewFormData(postReviewFormData => {
            return {...postReviewFormData, user_id: userData.id}
          })
        })
      }
      else if(response.status === 422){
        alert("Error: Username already exists or invalid Username or Password! Please try again!")
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
          <Route path="/reviews">
            {user ? <ReviewList reviews={user.reviews} deleteReview={deleteReview}/> : "Please log in to view reviews"}
            <br/>
            {user ? (games.length > 0 ? <CreateReviewForm createReview={createReview} handleChangeForPost={handleChangeForPost} setPostReviewFormData={setPostReviewFormData} games={games}/> : "Loading...") : null}
          </Route>
          {/* <Route path="/create_review">
            {user ? (games.length > 0 ? <CreateReviewForm createReview={createReview} handleChangeForPost={handleChangeForPost} setPostReviewFormData={setPostReviewFormData} games={games}/> : "Loading...") : null}
          </Route> */}
          {/* <Route path="/update_review">
            {user ? <UpdateGameForm games={games} updateGame={updateGame} handleChangeForUpdate={handleChangeForUpdate}/> : "Please log in to update a review"}
          </Route> */}
        </Switch>
      </header>
    </div>
  );
}

export default App;

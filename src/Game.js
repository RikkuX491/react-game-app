function Game({game, filterForDelete}){

    function deleteGame(){
        fetch(`/games/${game.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
        })
        .then(() => {
            filterForDelete(game.id)
        })
    }

    return (
        <div>
            <h2>Game # {game.id}</h2>
            <h2>Name: {game.title}</h2>
            <h2>Release Year: {game.release_year}</h2>
            <button onClick={deleteGame}>DELETE GAME</button>
        </div>
    )
}

export default Game;
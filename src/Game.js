function Game({game, deleteGame}){

    return (
        <div>
            <h2>Game # {game.id}</h2>
            <h2>Name: {game.title}</h2>
            <h2>Release Year: {game.release_year}</h2>
            <button onClick={() => deleteGame(game.id)}>DELETE GAME</button>
        </div>
    )
}

export default Game;
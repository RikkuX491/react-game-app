import Game from './Game'

function GameList({games, deleteGame}){

    const gameComponents = games.map(game => {
        return <Game key={game.id} game={game} deleteGame={deleteGame}/>
    })
    
    return (
        <>
            <h1>Here are all of the games:</h1>
            {gameComponents}
        </>
    )
}

export default GameList;
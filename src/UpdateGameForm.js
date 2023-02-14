import { useState } from 'react'

function UpdateGameForm({games, updateGame, handleChangeForUpdate}){

    const [id, setId] = useState(1)

    const optionTags = games.map(game => {
        return <option key={game.id} value={game.id}>{game.id}</option>
    })

    return(
        <form onSubmit={(event) => {
            event.preventDefault()
            updateGame(id)
        }}>
            <h1>Update a game:</h1>
            <label>Game ID: </label>
            <select onChange={(event) => setId(event.target.value)}>
                {optionTags}
            </select>
            <br/>
            <label>Title: </label>
            <input type="text" name="title" onChange={handleChangeForUpdate}/><br/>
            <label>Release Year: </label>
            <input type="number" name="release_year" onChange={handleChangeForUpdate}/><br/>
            <input type="submit"/>
        </form>
    )
}

export default UpdateGameForm;
import { useState } from 'react'

function UpdateGameForm({games, updateGame, handleChangeForUpdate}){

    const optionTags = games.map(game => {
        return <option key={game.id} value={game.id}>{game.id}</option>
    })

    return(
        <form onSubmit={(event) => {
            event.preventDefault()
            updateGame(event.target.childNodes[2].value)
        }}>
            <h1>Update a game:</h1>
            <label>Game ID: </label>
            <select>
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
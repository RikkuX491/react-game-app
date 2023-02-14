function CreateGameForm({createGame, handleChangeForPost}){
    return (
        <form onSubmit={createGame}>
            <h1>Create new game:</h1>
            <label>Title: </label>
            <input type="text" name="title" onChange={handleChangeForPost}/><br/>
            <label>Release Year: </label>
            <input type="number" name="release_year" onChange={handleChangeForPost}/><br/>
            <input type="submit"/>
        </form>
    )
}

export default CreateGameForm;
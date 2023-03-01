function Login({onLogin, updateLoginFormData}){
    return (
        <form onSubmit={onLogin}>
            <h1>Log In:</h1>
            <label>Username: </label>
            <input type="text" name="username" onChange={updateLoginFormData}/><br/>
            <input type="submit"/>
        </form>
    )
}

export default Login;
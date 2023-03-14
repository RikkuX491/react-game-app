import { Link } from 'react-router-dom';

function NavBar(){
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/reviews">Reviews</Link>
            <Link to="/games">Games</Link>
            <Link to="/create_game">Create Game</Link>
            <Link to="/update_game">Update Game</Link>
        </>
    )
}

export default NavBar;
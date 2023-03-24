import { Link } from 'react-router-dom';

function NavBar(){

    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/reviews">Reviews</Link>
            {/* <Link to="/create_review">Create Review</Link> */}
            {/* <Link to="/update_review">Update Review</Link> */}
        </>
    )
}

export default NavBar;
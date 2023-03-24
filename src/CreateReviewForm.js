import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react'

function CreateReviewForm({createReview, handleChangeForPost, games, setPostReviewFormData }){

    const location = useLocation();
    const [pathname, setPathname] = useState('')

    const optionTagsForGames = games.map(game => {
        return <option key={game.id} value={game.id}>{`${game.id}: ${game.title}`}</option>
    })

    const optionTagsForRatings = [1, 2, 3, 4, 5].map(rating => {
        return <option key={rating} value={rating}>{rating}</option>
    })

    useEffect(() => {
        if(pathname !== location.pathname){
            setPathname(location.pathname)
            setPostReviewFormData(postReviewFormData => {
                return {...postReviewFormData, game_id: games[0].id, rating: 1}
            })
        }
    }, [location]);

    return (
        <form onSubmit={createReview} style={{backgroundColor: "blue"}}>
            <h1>Create new review:</h1>
            <label>Game: </label>
            <select name="game_id" onChange={handleChangeForPost}>
                {optionTagsForGames}
            </select>
            <br/>
            <label>Rating: </label>
            <select name="rating" onChange={handleChangeForPost}>
                {optionTagsForRatings}
            </select>
            <br/>
            <input type="submit"/>
        </form>
    )
}

export default CreateReviewForm;
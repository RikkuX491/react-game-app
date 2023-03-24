function Review({review, deleteReview}){

    return (
        <div>
            <h2>Review ID: {review.id}</h2>
            <h2>Game Title: {review.game.title}</h2>
            <h2>Rating: {review.rating}</h2>
            <button onClick={() => deleteReview(review.id)}>DELETE REVIEW</button>
        </div>
    )
}

export default Review;
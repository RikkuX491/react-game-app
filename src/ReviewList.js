import Review from './Review'

function ReviewList({reviews, deleteReview}){

    const reviewComponents = reviews.map(review => {
        return <Review key={review.id} review={review} deleteReview={deleteReview}/>
    })
    
    return (
        <>
            <h1>Here are all of your reviews:</h1>
            {reviewComponents}
        </>
    )
}

export default ReviewList;
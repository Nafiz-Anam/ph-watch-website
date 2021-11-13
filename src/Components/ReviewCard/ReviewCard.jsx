import "./ReviewCard.css";
import Rating from 'react-rating'

const ReviewCard = (props) => {
    // console.log(props);
    const { name, rating, feedback } = props.Review;
    let rate = parseInt(rating);
    return (
        <div className="col-lg-4 ">
            <div className="feedback">
                <p>{feedback}</p>
                <div className="row align-items-center pt-3">
                    <div className="col-3">
                        <div className="feedback-logo d-flex align-items-center justify-content-center">
                            <h1>{name[0]}</h1>
                        </div>
                    </div>
                    <div className="col-9">
                        <h3>{name}</h3>
                        <Rating
                            initialRating={rate}
                            readonly
                            emptySymbol="far fa-star color"
                            fullSymbol="fas fa-star color"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;

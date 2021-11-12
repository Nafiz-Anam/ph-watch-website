import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = (props) => {
    //  console.log(props);
    const { _id, watchname, image, price } = props.Watch;
    return (
        <div className="col-lg-4 my-3 text-center">
            <div className="card all-card">
                <img src={image} className="card-img-top" alt="events" />
                <div className="card-body">
                    <h2 className="title">{watchname}</h2>
                    <h4 className="price">$ {price}</h4>
                </div>

                <Link to={`/shop/${_id}`}>
                    <button className="btn btn-details">Details</button>
                </Link>
            </div>
        </div>
    );
};

export default Card;

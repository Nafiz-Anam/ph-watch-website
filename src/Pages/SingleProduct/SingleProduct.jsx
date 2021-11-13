// import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./SingleProduct.css";
import { useEffect, useState } from "react";
import useAuth from "../../Firebase/Hooks/useAuth";

const SingleProduct = () => {
    const { id } = useParams();
    const [watch, setWatch] = useState({});
    const { setSaveDetails, setIsLoading } = useAuth();

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://serene-shelf-88269.herokuapp.com/shop/${id}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setWatch(data);
            })
            .finally(setIsLoading(false));
    }, []);

    const history = useHistory();

    const handleOrder = (watch) => {
        // console.log(watch);
        setSaveDetails(watch);
        history.push("/checkout");
    };

    return (
        <div className="single-details">
            {/* data loads here  */}
            <div className="container">
                <div className="row single-watch">
                    <div className="col-lg-6">
                        <img src={watch?.image} alt="" />
                    </div>
                    <div className="col-lg-6 watchdata">
                        <p>Home / Watch Shop / {watch?.watchname}</p>
                        <h1>{watch?.watchname}</h1>
                        <h3>$ {watch?.price}</h3>
                        <button
                            onClick={() => {
                                handleOrder(watch);
                            }}
                            className="btn btn-buy"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
                <div className="details">
                    <h1>Description</h1>
                    <p>{watch?.description}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;

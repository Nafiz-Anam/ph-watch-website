import React, { useEffect, useState } from "react";
import "./Home.css";
import Card from "../../Components/Card/Card";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";

const Home = () => {
    const [allWatches, setAllWatches] = useState([]);
    useEffect(() => {
        fetch("https://serene-shelf-88269.herokuapp.com/shop")
            .then((res) => res.json())
            .then((data) => setAllWatches(data));
    }, []);
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch("https://serene-shelf-88269.herokuapp.com/review")
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
                // console.log(data);
            });
    }, []);
    return (
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <div className="row align-items-center banner-content">
                        <div className="col-lg-6 home-text">
                            <h1>UPGRADE YOUR NEW STYLE</h1>
                            <p>
                                We have Original Branded Watches for Gents,
                                Ladies, Kids with Analog, Digital and Smartwatch
                                variation. We have popular brands like-
                                Fastrack, Casio, Fossil, Titan and so on. Buy
                                Authentic Watches with Warranty and express the
                                elegant & style to your Loved one ❤️️❤️️❤️️
                            </p>
                            <button className="btn btn-home">Shop Now</button>
                        </div>
                        <div className="col-lg-6">
                            <img
                                src="https://i.ibb.co/0Vpm4CG/bg1.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="latest text-center d-flex align-items-center justify-content-center">
                    <h1>MAYBE YOU LIKE</h1>
                    <div className="row py-5 feature-watch">
                        {allWatches.slice(0, 3).map((watch) => (
                            <Card Watch={watch} key={watch._id} />
                        ))}
                    </div>
                </div>
                <div className="style pb-5">
                    <div className="row align-items-center">
                        <div className="col-lg-3 style-img">
                            <img
                                src="https://i.ibb.co/vQdjKPm/man-adjusting-his-sleeves-wearing-a-watch-1-682x1024.jpg"
                                alt=""
                            />
                        </div>
                        <div className="col-lg-9">
                            <h1 className="style-hrading">
                                LIKE GOOD MAN & GREAT LOOKING
                            </h1>
                            <div className="row py-5">
                                {allWatches.slice(4, 7).map((watch) => (
                                    <Card Watch={watch} key={watch._id} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="quote">
                <h1>KEEP ON TIME & BE YOUR BEST LOOKING STYLE</h1>
            </div>
            <div className="container">
                <div className="limited py-5 my-5">
                    <div className="row align-items-center ">
                        <div className="col-lg-9">
                            <h1>LIKE GOOD MAN & GREAT LOOKING</h1>
                            <div className="row py-5">
                                {allWatches.slice(7, 10).map((watch) => (
                                    <Card Watch={watch} key={watch._id} />
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <img
                                src="https://i.ibb.co/3kQ8HQx/close-up-of-businessman-touching-wristwatch-1-682x1024.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className="category text-center">
                    <h1>SHOP BY CATEGORIES</h1>
                    <div className="row py-5">
                        <div className="col-lg-4">
                            <div className="cat-card cat-1">
                                <h3>
                                    CASUAL <br /> WATCH
                                </h3>

                                <button className="btn btn-cat">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="cat-card cat-2">
                                <h3>
                                    SPORT <br /> WATCH
                                </h3>

                                <button className="btn btn-cat">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="cat-card cat-3">
                                <h3>
                                    FASION <br /> WATCH
                                </h3>

                                <button className="btn btn-cat">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom">
                    <div className="row py-5 align-items-center">
                        <div className="col-lg-6">
                            <img
                                src="https://i.ibb.co/N6r0Px3/close-up-of-old-clock-watch-mechanism-retro-clockwork-watch-with-gearwheels-gears-vintage-movement-1.jpg"
                                alt=""
                            />
                        </div>
                        <div className="col-lg-6 custom-text">
                            <h1>CUSTOM PRODUCT TO CUSTOMIZE YOUR LOOK</h1>
                            <p>
                                Design your quality custom mechanical watch.
                                Upload your own signature, designs, patterns, or
                                start with our professionally designed
                                templates.
                            </p>
                            <ul>
                                <li>Kids Hand Watch</li>
                                <li>Men Hand Watch</li>
                                <li>Woman Hand Watch</li>
                            </ul>
                            <button className="btn btn-custom">
                                Request Custom
                            </button>
                        </div>
                    </div>
                </div>
                <div className="reviews">
                    <h1 className="text-center title">
                        BEST FEEDBACK FROM MANY PEOPLE
                    </h1>
                    <div className="row">
                        {reviews.map((review) => (
                            <ReviewCard Review={review} key={review._id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

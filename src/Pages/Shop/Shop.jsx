import React, { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import "./Shop.css";

const Shop = () => {
    // fetching data  here
    const [allWatches, setAllWatches] = useState([]);
    useEffect(() => {
        fetch("https://arloji-server.onrender.com/shop")
            .then((res) => res.json())
            .then((data) => setAllWatches(data));
    }, []);
    return (
        <div className="shop-page">
            <div className="banner">
                <h1>Shop</h1>
            </div>
            <div className="container">
                <div className="feature-watches">
                    <div className="row g-5">
                        <div className="col-lg-9 shop-all">
                            <div className="watches">
                                <div className="row">
                                    {allWatches
                                        .map((watch) => (
                                            <Card
                                                Watch={watch}
                                                key={watch._id}
                                            />
                                        ))
                                        .reverse()}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 sidebar">
                            <div className="search-form">
                                <form>
                                    <input
                                        placeholder="Seach Products..."
                                        type="text"
                                    />
                                    <button className="btn btn-search">
                                        <i className="fas fa-search"></i>
                                    </button>
                                </form>
                            </div>
                            <div className="timer text-center">
                                <div className="row">
                                    <div className="col-3">
                                        <div className="card">
                                            <h5>00</h5>
                                            <p>Days</p>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="card">
                                            <h5>00</h5>
                                            <p>Days</p>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="card">
                                            <h5>00</h5>
                                            <p>Days</p>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="card">
                                            <h5>00</h5>
                                            <p>Days</p>
                                        </div>
                                    </div>
                                </div>
                                <h2>GET DAILY FLASH SALE</h2>
                                <button className="btn btn-shop">
                                    Shop Now
                                </button>
                            </div>
                            <h2 className="py-3">Categories</h2>
                            <ul className="categories">
                                <li>Casual Watch</li>
                                <li>Sport Watch</li>
                                <li>Fashion Watch</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;

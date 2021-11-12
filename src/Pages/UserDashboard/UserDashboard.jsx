import React, { useEffect, useState } from "react";
// import UserBookings from "../../Components/UserBookings/UserBookings";
import "./UserDashboard.css";
import useAuth from "../../Firebase/Hooks/useAuth";
import Payment from '../../Components/Payment/Payment'
import Review from "../../Components/Review/Review";

const UserDashboard = () => {
    const { user } = useAuth();
    // fetching specific data  here
    const [allOrders, setAllOrders] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/orders")
            .then((res) => res.json())
            .then((data) => {
                const specificOrder = data.filter(
                    (order) => order.email === user.email
                );
                setAllOrders(specificOrder);
                // console.log(data);
            });
    }, []);
    // deleting a booking
    const handleDelete = (id) => {
        const proceed = window.confirm("Are you sure, you want to cancel?");
        if (proceed) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.deletedCount > 0) {
                        alert("Canceled Successfully.");
                        const remainingBookings = allOrders.filter(
                            (booking) => booking._id !== id
                        );
                        setAllOrders(remainingBookings);
                    }
                });
        }
    };
    return (
        <div className="profile-page">
            <div className="container">
                <div className="d-flex align-items-start admin-panel">
                    <div
                        className="nav flex-column me-3 menu-side"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="vertical"
                    >
                        <button
                            className="nav-link active btn"
                            id="v-pills-home-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#v-pills-home"
                            type="button"
                            role="tab"
                            aria-controls="v-pills-home"
                            aria-selected="true"
                        >
                            <i class="fas fa-shopping-cart"></i> All Orders
                        </button>
                        <button
                            className="nav-link btn"
                            id="v-pills-profile-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#v-pills-profile"
                            type="button"
                            role="tab"
                            aria-controls="v-pills-profile"
                            aria-selected="false"
                        >
                            <i class="fas fa-dollar-sign"></i> Make Payment
                        </button>
                        <button
                            className="nav-link btn"
                            id="v-pills-review-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#v-pills-review"
                            type="button"
                            role="tab"
                            aria-controls="v-pills-review"
                            aria-selected="false"
                        >
                            <i class="fas fa-stars"></i> Leave a Review
                        </button>
                    </div>
                    <div
                        className="tab-content content-side"
                        id="v-pills-tabContent"
                    >
                        <div
                            className="tab-pane fade show active"
                            id="v-pills-home"
                            role="tabpanel"
                            aria-labelledby="v-pills-home-tab"
                        >
                            <div className="booking-list">
                                <h1 className="profile-title text-center">
                                    All Your Purchases {user.displayName}
                                </h1>
                                <div className="booking-list">
                                    {/* mobile bookings  */}
                                    <div className="mobile-booking">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                {allOrders.map((order) => (
                                                    <div
                                                        key={order?._id}
                                                        className="card m-4"
                                                    >
                                                        <img
                                                            src={order?.image}
                                                            className="card-img-top"
                                                            alt="..."
                                                        />
                                                        <div className="card-body">
                                                            <h5 className="card-title">
                                                                {
                                                                    order?.hotelname
                                                                }
                                                            </h5>
                                                            <p className="card-text">
                                                                Booked By :{" "}
                                                                <b>
                                                                    {
                                                                        order?.name
                                                                    }
                                                                </b>
                                                            </p>
                                                            <p className="card-text">
                                                                Email :{" "}
                                                                <b>
                                                                    {
                                                                        order?.email
                                                                    }
                                                                </b>
                                                            </p>
                                                            <p className="card-text">
                                                                Status :{" "}
                                                                {order?.status}
                                                            </p>
                                                            <div className="buttons mt-3">
                                                                <button
                                                                    onClick={() => {
                                                                        handleDelete(
                                                                            order._id
                                                                        );
                                                                    }}
                                                                    className="btn btn-danger mx-1"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/* mobile bookings  */}
                                    <table className="booking-table">
                                        <thead className="table-list ">
                                            <tr>
                                                <td>Customer</td>
                                                <td>Customer Email</td>
                                                <td>Purchased Watch</td>
                                                <td>Action</td>
                                                <td>Status</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allOrders.map((order) => (
                                                <tr key={order?._id}>
                                                    <td>{order?.name}</td>
                                                    <td>{order?.email}</td>
                                                    <td>{order?.watchname}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                handleDelete(
                                                                    order._id
                                                                );
                                                            }}
                                                            className="btn btn-danger mx-1"
                                                        >
                                                            X
                                                        </button>
                                                    </td>
                                                    <td>{order?.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div
                            className="tab-pane fade event"
                            id="v-pills-profile"
                            role="tabpanel"
                            aria-labelledby="v-pills-profile-tab"
                        >
                            <Payment />
                        </div>
                        <div
                            className="tab-pane fade event"
                            id="v-pills-review"
                            role="tabpanel"
                            aria-labelledby="v-pills-review-tab"
                        >
                            <Review />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;

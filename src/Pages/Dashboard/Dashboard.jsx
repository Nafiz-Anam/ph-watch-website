import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useForm } from "react-hook-form";
import MakeAdmin from "../../Components/MakeAdmin/MakeAdmin";

const Dashboard = () => {
    const { register, handleSubmit, reset } = useForm();
    const [allOrders, setAllOrders] = useState([]);
    const onSubmit = (data) => {
        console.log(data);
        fetch("http://localhost:5000/shop", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    alert("Successfully added new listing.");
                    reset();
                }
            });
    };
    // fetching all bookings
    // fetching data  here
    // const [allBookings, setAllBookings] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/orders")
            .then((res) => res.json())
            .then((data) => {
                setAllOrders(data);
                // console.log(data);
            });
    }, []);
    //delete single booking
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
                        const remainingOrders = allOrders.filter(
                            (order) => order._id !== id
                        );
                        setAllOrders(remainingOrders);
                    }
                });
        }
    };
    // single data
    const [order, setOrder] = useState({});
    // update status
    const handleStatus = (id) => {
        fetch(`http://localhost:5000/orders/${id}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setOrder(data);
            });
        const updatedStatus = { ...order };
        updatedStatus.status = "Shipped";
        setOrder(updatedStatus);
        fetch(`http://localhost:5000/orders/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedStatus),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    alert("Approved Successfully.");
                    fetch("http://localhost:5000/orders")
                        .then((res) => res.json())
                        .then((data) => {
                            setAllOrders(data);
                            // console.log(data);
                        });
                    // const remainingBookings = allBookings.filter();
                    // setAllBookings(remainingBookings);
                }
            });
    };
    return (
        <div className="admin-page">
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
                            <i className="fas fa-shopping-cart"></i> All Orders
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
                            <i className="fal fa-plus"></i> All new Listing
                        </button>
                        <button
                            className="nav-link btn"
                            id="v-pills-admin-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#v-pills-admin"
                            type="button"
                            role="tab"
                            aria-controls="v-pills-admin"
                            aria-selected="false"
                        >
                            <i className="fas fa-user-cog"></i> Make An Admin
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
                                <h1>All Orders</h1>
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
                                                            {order?.watchName}
                                                        </h5>
                                                        <p className="card-text">
                                                            Booked By :{" "}
                                                            <b>{order?.name}</b>
                                                        </p>
                                                        <p className="card-text">
                                                            Email :{" "}
                                                            <b>
                                                                {order?.email}
                                                            </b>
                                                        </p>
                                                        <p className="card-text">
                                                            Status :
                                                            {order?.status}
                                                        </p>
                                                        <div className="buttons mt-3">
                                                            <button
                                                                onClick={() =>
                                                                    handleStatus(
                                                                        order._id
                                                                    )
                                                                }
                                                                className="btn btn-success mx-1"
                                                            >
                                                                Approve
                                                            </button>
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
                                            <td>Name</td>
                                            <td>Email ID</td>
                                            <td>Booked Item</td>
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
                                                        onClick={() =>
                                                            handleStatus(
                                                                order._id
                                                            )
                                                        }
                                                        className="btn btn-success m-1"
                                                    >
                                                        Shipped
                                                    </button>
                                                    <br />
                                                    <button
                                                        onClick={() => {
                                                            handleDelete(
                                                                order._id
                                                            );
                                                        }}
                                                        className="btn btn-danger m-1"
                                                    >
                                                        Cancel
                                                    </button>
                                                </td>
                                                <td>{order?.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div
                            className="tab-pane fade event"
                            id="v-pills-profile"
                            role="tabpanel"
                            aria-labelledby="v-pills-profile-tab"
                        >
                            <div className="add-event">
                                <h1>Add New Listing</h1>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row add-form">
                                        <div className="col-lg-6 col-sm-12 right-side">
                                            <label htmlFor="banner">
                                                Watch Image
                                            </label>
                                            <input
                                                type="text"
                                                id="banner"
                                                placeholder="Image Link"
                                                {...register("image")}
                                            />
                                            <label htmlFor="eventTitle">
                                                Watch Name
                                            </label>
                                            <input
                                                type="text"
                                                id="eventTitle"
                                                placeholder="Watch Name"
                                                {...register("watchname", {
                                                    required: true,
                                                })}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-sm-12 left-side">
                                            <label htmlFor="price">Price</label>
                                            <input
                                                type="text"
                                                id="price"
                                                placeholder="Price"
                                                {...register("price", {
                                                    required: true,
                                                })}
                                            />
                                            <label htmlFor="description">
                                                Description
                                            </label>
                                            <textarea
                                                type="text"
                                                id="description"
                                                placeholder="Enter Description"
                                                {...register("description")}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            className="btn btn-add"
                                            type="submit"
                                            value="Add Listing"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div
                            className="tab-pane fade event"
                            id="v-pills-admin"
                            role="tabpanel"
                            aria-labelledby="v-pills-admin-tab"
                        >
                            <MakeAdmin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

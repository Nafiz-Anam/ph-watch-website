import React, { useEffect, useState } from "react";

const ManageProducts = () => {
    const [allWatches, setAllWatches] = useState([]);
    useEffect(() => {
        fetch("https://arloji-server.onrender.com/shop")
            .then((res) => res.json())
            .then((data) => {
                setAllWatches(data);
                // console.log(data);
            });
    }, []);
    const handleDelete = (id) => {
        const proceed = window.confirm("Are you sure, you want to delete?");
        if (proceed) {
            fetch(`https://arloji-server.onrender.com/shop/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.deletedCount > 0) {
                        alert("Deleted Successfully.");
                        const remainingWatches = allWatches.filter(
                            (watch) => watch._id !== id
                        );
                        setAllWatches(remainingWatches);
                    }
                });
        }
    };
    return (
        <div className="booking-list">
            <h1>All watchs</h1>
            {/* mobile bookings  */}
            <div className="mobile-booking">
                <div className="row">
                    <div className="col-sm-12">
                        {allWatches.map((watch) => (
                            <div key={watch?._id} className="card m-4">
                                <img
                                    src={watch?.image}
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {watch?.watchName}
                                    </h5>
                                    <p className="card-text">
                                        Booked By : <b>{watch?.name}</b>
                                    </p>
                                    <p className="card-text">
                                        Email : <b>{watch?.email}</b>
                                    </p>
                                    <p className="card-text">
                                        Status :{watch?.status}
                                    </p>
                                    <div className="buttons mt-3">
                                        <button
                                            onClick={() => {
                                                handleDelete(watch._id);
                                            }}
                                            className="btn btn-danger mx-1"
                                        >
                                            Delete
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
                        <td>Price</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {allWatches.map((watch) => (
                        <tr key={watch?._id}>
                            <td>{watch?.watchname}</td>
                            <td>$ {watch?.price}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        handleDelete(watch._id);
                                    }}
                                    className="btn btn-danger m-1"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProducts;

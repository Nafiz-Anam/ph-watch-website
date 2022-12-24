import React from "react";
import "./Checkout.css";
import { useForm } from "react-hook-form";
import useAuth from "../../Firebase/Hooks/useAuth";
import { useHistory } from "react-router-dom";

const Checkout = () => {
    // importing login methods here
    const { user, saveDetails } = useAuth();
    // console.log(saveDetails);
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const onSubmit = (data) => {
        // console.log(data);
        fetch("https://arloji-server.onrender.com/orders", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    alert("Order Successful..!!");
                    history.push("/userdashboard");
                }
            });
    };
    return (
        <div className="volunteer-register">
            <div className="container volunteer-container">
                <div className="volunteer-reg-form shadow">
                    <h1>Confirm Purchase</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            // placeholder="Full Name"
                            defaultValue={user?.displayName}
                            {...register("name", {})}
                        />
                        <input
                            type="email"
                            // placeholder="Email"
                            defaultValue={user?.email}
                            {...register("email")}
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            {...register("phone")}
                        />
                        <input
                            type="text"
                            placeholder="Watch Name"
                            defaultValue={saveDetails?.watchname}
                            {...register("watchname")}
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            {...register("address")}
                        />
                        <input
                            type="text"
                            placeholder="Your Comment"
                            {...register("comment")}
                        />
                        <input
                            className="hidden-field"
                            type="text"
                            defaultValue="Pending"
                            {...register("status")}
                        />
                        <input
                            className="hidden-field"
                            type="text"
                            defaultValue={saveDetails?.image}
                            {...register("image")}
                        />
                        <input
                            className="btn btn-confirm"
                            type="submit"
                            value="Confirm Purchase"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Firebase/Hooks/useAuth";
import { useHistory } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
    const { register, handleSubmit } = useForm();
    const { user } = useAuth();
    const history = useHistory();
    const onSubmit = (data) => {
        // console.log(data);
        fetch("https://arloji-server.onrender.com/payments", {
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
        <div className="payment-page">
            <h1 className="text-center">Pay with Cards</h1>
            <div className="card-imgs d-flex justify-content-center pb-3">
                <img
                    className="credit-cards"
                    src="https://i.ibb.co/9TmrbJ5/credit-card-logos.jpg"
                    alt=""
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    // placeholder="Holder name"
                    defaultValue={user?.displayName}
                    {...register("card-owner")}
                />
                <input
                    type="text"
                    // placeholder="Holder name"
                    defaultValue={user?.email}
                    {...register("card-owner-email")}
                />
                <input
                    type="number"
                    placeholder="Total Cost"
                    {...register("total-cost")}
                />
                <input
                    type="text"
                    placeholder="Card number"
                    {...register("cardnumber")}
                />
                <input
                    type="text"
                    placeholder="Expiration date"
                    {...register("card-expire")}
                />
                <input
                    type="text"
                    placeholder="CVC"
                    {...register("card-cvc")}
                />
                <input
                    className="btn btn-confirm"
                    type="submit"
                    value="Confirm Purchase"
                />
            </form>
            <h5 className="text-center py-5">Or Using Mobile Banking</h5>
            <div className="pay-buttons text-center">
                <button className="btn paypal m-1">
                    <img
                        src="https://i.ibb.co/v405fSh/1200px-Pay-Pal-logo-svg.png"
                        alt=""
                    />
                </button>
                <button className="btn nogod  m-1">
                    <img
                        src="https://i.ibb.co/grr8YKd/Nagad-Logo-wine.png"
                        alt=""
                    />
                </button>
                <button className="btn bkash  m-1">
                    <img src="https://i.ibb.co/g4Ldd00/bkash-logo.png" alt="" />
                </button>
            </div>
        </div>
    );
};

export default Payment;

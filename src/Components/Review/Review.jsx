import React from "react";
import "./Review.css";
import { useForm } from "react-hook-form";
import useAuth from "../../Firebase/Hooks/useAuth";

const Review = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { user } = useAuth();
    const onSubmit = (data) => {
        // console.log(data);
        fetch("https://arloji-server.onrender.com/review", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if (data.insertedId) {
                    alert("Thanks for Your Feedback...!!!");
                    reset();
                }
            });
    };

    return (
        <div className="container review-area">
            <div className="review">
                <h1>Please Leave a Review</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        defaultValue={user?.displayName}
                        {...register("name")}
                    />
                    <input
                        placeholder="Rating from 1 to 5"
                        type="number"
                        {...register(
                            "rating",
                            { min: 1, max: 5 },
                            { required: true }
                        )}
                    />
                    {errors.rating && "Enter rating between 1 to 5"}
                    <textarea
                        placeholder="Your Feedback"
                        type="text"
                        {...register("feedback", { required: true })}
                    />
                    <input className="review-btn" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default Review;

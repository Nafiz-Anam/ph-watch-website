import { useForm } from "react-hook-form";
import "./MakeAdmin.css";

const MakeAdmin = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        fetch("http://localhost:5000/users/admin", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    alert("Successfully added new listing.");
                    reset();
                    // console.log(data);
                    // setSuccess(true);
                }
            });
    };

    return (
        <div className="container makeadmin">
            <h2>Make an Admin</h2>
            <div className="make-admin-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: true,
                        })}
                    />
                    <input
                        className="btn btn-admin"
                        type="submit"
                        value="Add Admin"
                    />
                </form>
            </div>
        </div>
    );
};

export default MakeAdmin;

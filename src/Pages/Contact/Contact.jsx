import React from "react";
import "./Contact.css";
import { useForm } from "react-hook-form";

const Contact = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);
    return (
        <div className="contact-page">
            <div className="banner">
                <h1 className="text-center title">LETS GET IN TOUCH</h1>
            </div>
            <div className="container">
                <div className="contacts pb-5">
                    <div className="row text-center">
                        <div className="col-lg-4">
                            <div className="card shadow">
                                <i className="fas fa-map-marked-alt"></i>
                                <h3>our office</h3>
                                <p>Madiun East Java Indonesia</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card shadow">
                                <i className="fas fa-envelope"></i>
                                <h3>our email</h3>
                                <p>support@arloji.com</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card shadow">
                                <i className="fas fa-phone-square-alt"></i>
                                <h3>our phone</h3>
                                <p>0456 524 222</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="col-lg-6">
                        <div className="map">
                            <iframe
                                title="map-khulna"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14710.423366238587!2d89.55679903664183!3d22.817064639553834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff90193c82d64b%3A0xd48ce5c464563d6d!2sKhulna%20City%2C%20Khulna!5e0!3m2!1sen!2sbd!4v1636619300285!5m2!1sen!2sbd"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="contact-form">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label htmlFor="name">Name</label>
                                <input {...register("name")} />
                                <label htmlFor="email">Email</label>
                                <input {...register("email")} />
                                <label htmlFor="message">Message</label>
                                <textarea {...register("message")} />
                                <button
                                    className="btn btn-contact"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthContexts from "./Firebase/Contexts/AuthContexts";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/404/NotFound";
import Contact from "./Pages/Contact/Contact";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Checkout from "./Pages/Checkout/Checkout";
import About from "./Pages/About/About";
import Shop from "./Pages/Shop/Shop";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";
import Footer from "./Components/Footer/Footer";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";


function App() {
    return (
        <div className="App">
            <AuthContexts>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/home">
                            <Home />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route exact path="/shop">
                            <Shop />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        {/* single route  */}
                        <Route exact path="/shop/:id">
                            <SingleProduct />
                        </Route>
                        {/* single route  */}
                        {/* Private Route here  */}
                        <PrivateRoute exact path="/dashboard">
                            <Dashboard />
                        </PrivateRoute>
                        <PrivateRoute exact path="/userdashboard">
                            <UserDashboard />
                        </PrivateRoute>
                        <PrivateRoute exact path="/checkout">
                            <Checkout />
                        </PrivateRoute>
                        {/* Private Route here  */}
                        {/* error page  */}
                        <Route path="/*">
                            <NotFound />
                        </Route>
                        {/* error page  */}
                    </Switch>
                    <Footer />
                </Router>
            </AuthContexts>
        </div>
    );
}

export default App;

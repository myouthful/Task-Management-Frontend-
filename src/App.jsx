import React, { useContext } from "react";
import Header from "./components/Header";
import Welcome from "./components/welcome";
import SignUpForm from "./components/signupform";
import Login from "./components/loginform";

function App() {
    return (
        <>
           <Header />
           <Welcome />
           <Login />
        </>
    );
}

export default App;





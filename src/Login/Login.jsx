import { useNavigate } from "react-router-dom";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../http-common";
//import Forget_Password from "../Forget_Password/Forget_Password";
// import Hr from "../Hr_Home/Hr_Home";
export default function Login({ handleSignup }) {
    //two regular expressions: emailRegex and PasswordRegex. 
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    //initializes two state variables: email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    
// two functions: handleEmail and handlePassword, 
    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    // function signUp(e) {
    //     e.preventDefault();
    //     navigate("/signUp");
    // }


    async function login(e) {
        e.preventDefault();

        try {
            if (!emailRegex.test(email)) {
                alert("enter valid Email id")
            }
            else if (!PasswordRegex.test(password)) {
                alert("enter valid password");
            }
            else {
                const user = await loginUser({ email, password });
                console.log("User data", user);
                      // Check the response to determine the login result
                      if (user === "Login successful") {
                        alert("Login successful");
                        setEmail('');
                        setPassword('');
                        navigate("/home");
                     } 
                    //  else if (user === "Login failed") {
                    //     alert("Incorrect email or password. Please try again.");
                    //  }
                     else {
                        alert("User not found. Please sign up first.");
                    }
                }
            } catch (error) {
                console.error('Login failed:', error.message);
            }

        }
    return (
        <div className="bg-colour">

<div className="Login_page">
            <button className="Signup_btn" onClick={() => {
                handleSignup();
                navigate("/signUp");
            }}>SignUp</button>
            <h1 className="form_header">Login</h1>
            <form className="form" >
                <div className="email">
                    <input
                        className="user_value_email"
                        type="email"
                        placeholder="Enter email"
                        name="username"

                        value={email}
                        onChange={handleEmail}></input>
                    {/* <label className="domain">@littuss.com</label> */}
                </div><br />
                <input
                    className="user_value_password"
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={password}
                    onChange={handlePassword}></input><br />
                <p className="reset_password"><Link to="/Forgot_Password"><b>Forgot Password?</b></Link></p>
                <input
                    className="user_value"
                    type="submit"
                    value="Login"
                    onClick={login}></input>
            </form>
        </div>
        </div>
        

    )
}

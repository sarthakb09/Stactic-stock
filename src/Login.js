import React, { useState } from "react";
import { auth } from "./firebase-config";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    
    const handleRegister = (e) => {
    e.preventDefault();
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
    setMessage("Register successful");
    setError("");
    })
    .catch((err) => {
    setError(err.message);
    });
    };
    
    const handleLogin = (e) => {
    e.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
    setUser(res.user);
    setError("");
    })
    .catch((err) => {
    setError(err.message);
    });
    };
    
    return (
    <div>
    {user ? (
    <WelcomePage user={user} />
    ) : (
    <>
    <form>
    <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    />
    <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />
    <button onClick={handleLogin}>Login</button>
    <button onClick={handleRegister}>Register</button>
    </form>
    {error && <p>{error}</p>}
    {message && <p>{message}</p>}
    </>
    )}
    </div>
    );
    };
    
    const WelcomePage = ({ user }) => {
    return (
    <div>
    <h1>Welcome {user.email}</h1>
    </div>
    );
    };
    
    export default Login;

    

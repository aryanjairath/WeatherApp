import React, {useState} from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // ← Prevents the page refresh
        console.log(email)
        console.log(password)
    };

    return (
        <div>
            <h1>Log in to your wonderful weather account</h1>
            <form onSubmit = {handleLogin}>
                <input type = 'text' placeholder='Enter your email address' value = {email} onChange={(e) => setEmail(e.target.value)}/>
                <input type = 'password' placeholder='Enter a password' value = {password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={handleLogin}>Submit form</button>
            </form>
        </div>
    )
};

export default Login;
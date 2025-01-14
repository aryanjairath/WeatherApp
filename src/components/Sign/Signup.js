import React, {useState} from 'react';
import './Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault(); // ← Prevents the page refresh
        console.log(email)
        console.log(password)
    };

    return (
        <div>
            <h1>Sign Up for a wonderful weather account</h1>
            <form onSubmit = {handleSignup}>
                <input type = 'text' placeholder='Enter your email address' value = {email} onChange={(e) => setEmail(e.target.value)}/>
                <input type = 'password' placeholder='Enter a password' value = {password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={handleSignup}>Submit form</button>
            </form>
        </div>
    )
};

export default Signup;
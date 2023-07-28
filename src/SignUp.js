import './App.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState();
    const [Password, setPassword] = useState();
    const [email, setEail] = useState();
    const Navigate = useNavigate();
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            name: name,
            password: Password,
            email: email,
        };

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('New post created:', data);
                Navigate("/Login");
                console.log("checking");
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });
    };
    console.log(name);
    return (
        <div className="form">
            <div>
                <input className='input'
                    placeholder='Enter Your Name'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <input
                    placeholder='Enter Your Email ID'
                    className='input'
                    type="email"
                    value={email}
                    onChange={(e) => setEail(e.target.value)}
                />
            </div>
            <div>
                <input
                    className='input'
                    placeholder='Enter Your Password'
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button class="button" type="submit" onClick={handleFormSubmit}>Log In</button>
            </div>
        </div>
    );
}
export default SignUp;




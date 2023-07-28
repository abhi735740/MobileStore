import { Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { useState } from 'react';

const Login = () => {
    const [name, setName] = useState();
    const [Password, setPassword] = useState();
    const Navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/users/?name=' + name + '&password=' + Password).then((res) =>
            res.json()).then((resp) => {
                if (resp.length === 1) {
                    alert('Login successful!');
                    let a = localStorage.setItem("result", JSON.stringify(resp));
                    console.log(a)
                    Navigate('/');
                } else {
                    alert('Invalid credentials. Please try again.');
                }
            }).catch((err) => {
                console.log("testing");
                console.log("login failed" + err.message);
            })
    }
    const signup = () => {
        Navigate('/signUp')
    }
    console.log(name);
    return (
        <div className="form">
            <div>

                <input className='input'
                    placeholder='Username'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <input
                    placeholder='Password'
                    className='input'
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button class="button" type="submit" onClick={submit}>Login</button>
                <br></br>
                <text>Don't Hvae an account Please SignUp</text>
                <br></br>
                <button class="button" onClick={signup}>SignUp</button>
            </div>
        </div>
    );
}
export default Login;
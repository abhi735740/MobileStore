import React from "react";
import './App.css';
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
    const Navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem("result"));
    //console.log(data[0].name)
    const logout = () => {
        console.log("abhishek");
        localStorage.clear();
        Navigate('/');
    }
    return (
        <div >
            {data ?
                <ul className="nav-ul" >

                    <li>
                        <Link to='/cart'>View Cart</Link>
                    </li>

                    <li>
                        <Link to='/'>Home</Link>
                    </li>

                    <select name="plan" id="plan" className="dropdown">
                        <option value="none" selected disabled hidden>{data[0].name}</option>
                        <option value="logout" onClick={logout}>logout</option>
                    </select>

                </ul>
                :
                <ul className="nav-ul nav-right" >
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/signUp'>Sign Up</Link>
                    </li>
                    <li>
                        <Link to='/Login'>Login</Link>
                    </li>

                </ul>
            }
        </div>
    )
}

export default Nav;
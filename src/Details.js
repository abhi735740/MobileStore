import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const Details = () => {


    const param = useParams();
    const [detail, setData] = useState([]);
    const Navigate = useNavigate()
    const data = localStorage.getItem("result");

    const addtocart = () => {
        let Cart = localStorage.setItem("add", JSON.stringify(detail));
        data ? Navigate('/cart') : alert("Please Login")
    }

    const Back = () => {
        Navigate(-1)
    }

    useEffect(() => {
        console.log()
        getItem();
    }, [])

    const getItem = () => {

        fetch(`http://localhost:3000/MobileData/${param.id}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }


    return (
        <div className="form">
            < table className="table table-hover table table-bordered">
                <thead>
                    <tr>
                        <th>Company Nmae</th>
                        <th>Price</th>
                        <th>color</th>
                        <th>Screen Size</th>
                        <th>Camera</th>
                        <th>Battery</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{detail.brand}</td>
                        <td>{detail.price}</td>
                        <td>{detail.color}</td>
                        <td>{detail.screenSize}</td>
                        <td>{detail.camera}</td>
                        <td>{detail.battery}</td>
                    </tr>
                </tbody>
            </table>

            <div >
                <  button class="button" onClick={addtocart}>ADD TO Cart</button>

                <br></br>
                <button class="button" onClick={Back}>Back</button>
            </div>

        </div >
    )
}

export default Details;
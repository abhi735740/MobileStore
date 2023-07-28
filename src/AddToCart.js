import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddToCart = () => {
    const Navigate = useNavigate()
    const [List, setDataList] = useState([]);

    const Back = () => {
        Navigate('/')
    }

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('add'));
        if (storedData) {
            fetch('http://localhost:3000/CartItem/?id=' + storedData.id).then((res) =>
                res.json()).then((resp) => {
                    if (resp.length === 1) {
                        increment(storedData.id);
                    } else {
                        addItem();
                    }
                }).catch((err) => {
                    console.log("testing");
                    console.log("login failed" + err.message);
                })
        }
        else {
            console.log("no item")
            getItem();
        }
    }, [])

    const addItem = async () => {
        const storedData = JSON.parse(localStorage.getItem('add'));
        await fetch("http://localhost:3000/CartItem", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(storedData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Post response:', data);
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });
        getItem();
    }
    const deleteItem = async (id) => {
        await fetch(`http://localhost:3000/CartItem/${id}`, {
            method: 'Delete'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Delete response:', data);
                getItem();
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });

    }
    const getItem = async () => {
        localStorage.removeItem('add');
        await fetch("http://localhost:3000/CartItem")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setDataList(data);
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });
    }

    const placeorder = (id) => {
        var min = 10000;
        var max = 100000000;
        var random = min + (Math.random() * (max - min));
        alert("your order is successfully placed order id->" + random)
        deleteItem(id);
    }

    const increment = async (id) => {
        await fetch(`http://localhost:3000/MobileData/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("increment");
                cartitem(id, data.price, data.quantity);
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });

    }

    const cartitem = (id, initalPrice, initialquantity) => {
        console.log(initalPrice)
        fetch(`http://localhost:3000/CartItem/${id}`)
            .then((response) => response.json())
            .then((data) => {
                updatedata(id, initalPrice, initialquantity, data.price, data.brand, data.color, data.screenSize, data.camera, data.battery, data.quantity);
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });
    }

    const updatedata = (e, initalPrice, initialquantity, catItemPrice, Brand, Color, Size, Camera, Battery, Quantity) => {
        const a = Number(initalPrice) + Number(catItemPrice)
        const b = initialquantity + Quantity
        console.log(a);
        const newData = {
            id: e,
            brand: Brand,
            price: a,
            color: Color,
            screenSize: Size,
            camera: Camera,
            battery: Battery,
            quantity: b
        }
        fetch(`http://localhost:3000/CartItem/${e}`
            , {
                method: "put",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(newData),
            })
            .then((response) => response.json())
            .then((data) => {
                getItem();
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });

    }

    return (
        <div className="form">
            < table className=" table table-bordered">
                <thead>
                    <tr>
                        <th>Company Nmae</th>
                        <th>Price</th>
                        <th>color</th>
                        <th>Screen Size</th>
                        <th>Camera</th>
                        <th>Battery</th>
                        <th>Action</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        List.map((item) => (
                            <tr key={item.id}>
                                <td>{item.brand}</td>
                                <td>{item.price}</td>
                                <td>{item.color}</td>
                                <td>{item.screenSize}</td>
                                <td>{item.camera}</td>
                                <td>{item.battery}</td>
                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-secondary" onClick={() => deleteItem(item.id)}>Remove</button>
                                        <button type="button" class="btn btn-secondary" onClick={() => placeorder(item.id)}>Order</button>
                                        <button type="button" class="btn btn-secondary" onClick={() => increment(item.id)}>ADD</button>
                                    </div>
                                </td>
                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-secondary">{item.quantity}</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div >
                <button class="button" onClick={Back}>Back</button>
            </div>

        </div >
    )
}

export default AddToCart;
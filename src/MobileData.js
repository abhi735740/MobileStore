import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { MdAppShortcut } from "react-icons/md";
import { Link } from "react-router-dom";


const MobileData = () => {

    const [ListData, setData] = useState([]);
    const [search, setsearch] = useState('');
    const [FillterData, setFilter] = useState([]);
    const [Next, setNext] = useState(1);
    const [Lower, setLower] = useState([]);

    const searchItems = (e) => {
        setsearch(e);
        console.log(search.length)
        const filteredData = ListData.filter((item) => {
            return Object.values(item.brand).join('').toLowerCase().includes(search.toLowerCase())
        })
        setFilter(filteredData)

        // const lowestPriceGoods = ListData.sort((el1, el2) => el1.price.localeCompare(el2.price, undefined, { numeric: true }));
        // setLower(lowestPriceGoods);
        // console.log(Lower)

        // if (e.length>1) {
        //     const highestPriceGoods = ListData.sort((el1, el2) => el2.price.localeCompare(el1.price, undefined, { numeric: true }));
        //     setFilter(highestPriceGoods)
        // }
        // else if (e === 2) {
        //     const highestPriceGoods = ListData.sort((el1, el2) => el2.price.localeCompare(el1.price, undefined, { numeric: true }));
        //     setFilter(highestPriceGoods);
        // }
    }

    const LowPrice = () => {
        console.log(Next);
        fetch(`http://localhost:3000/MobileData?_page=${1}&_limit=4&_sort=price`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                console.log(data)

            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    const HighPrice = () => {
        console.log(Next);
        fetch(`http://localhost:3000/MobileData?_page=${Next}&_limit=4&_sort=price&_order=desc`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        console.log("just for testing" + Next)
        fetch(`http://localhost:3000/MobileData?_page=${Next}&_limit=4`).then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setData(data);
                    console.log(data)
                }
                else {
                    alert("No More Data")
                    setNext(1)
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [Next]);

    const submit = () => {
        setsearch('');
        setFilter([])
    }

    const NextPagination = () => {
        setNext(Next + 1)
        console.log(Next)
    }
    const PrePagination = () => {
        setNext(Next - 1)
        console.log(Next)
    }


    return (


        <div className="form">
            <div class="search">

                <input type="text" name="search" value={search}
                    onChange={(e) => searchItems(e.target.value)} />
                <button type="submit" onClick={submit}>Clear Search</button>
                <button className="search-Button" type="submit" onClick={LowPrice}>Lower Price</button>
                <button className="search-Button" type="submit" onClick={HighPrice}>Hign Price</button>

            </div>
            {search.length > 1
                ? (
                    < table className="table table-hover table table-bordered">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Company Nmae</th>
                                <th>Price</th>
                                <th>Action</th>

                                {/* Add more headers based on your data structure */}
                            </tr>
                        </thead>
                        <tbody>
                            {FillterData.map((item) => (
                                <tr key={item.id}
                                >
                                    <td>
                                        <MdAppShortcut className="App-logo" alt="logo" />
                                    </td>
                                    <td>{item.brand}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <div className="action">
                                            <Link to={`/details/${item.id}`} type="button" class="btn btn-primary btn-lg btn-block">View Detail</Link>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>) : (
                    <table className="table table-hover table table-bordered">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Company Nmae</th>
                                <th>Price</th>
                                <th>Action</th>

                                {/* Add more headers based on your data structure */}
                            </tr>
                        </thead>
                        <tbody>
                            {ListData.map((item) => (
                                <tr key={item.id}
                                >
                                    <td>
                                        <MdAppShortcut className="App-logo" alt="logo" />
                                    </td>
                                    <td>{item.brand}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <div className="action">

                                            <Link to={`/details/${item.id}`} type="button" class="btn btn-primary btn-lg btn-block">View Detail</Link>

                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>)
            }
            {Next > 1 ?
                <div>
                    <button className="search-Button" type="submit" onClick={NextPagination}>Next Page...</button>
                    <button className="search-Button" type="submit" onClick={PrePagination}>Previous Page...</button>
                </div>
                :
                <div>
                    <button className="search-Button" type="submit" onClick={NextPagination}>Next Page...</button>
                </div>
            }
        </div >
    );
};


export default MobileData;
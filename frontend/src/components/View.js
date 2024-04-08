import React, { useEffect, useState } from 'react';
import Header from "./Header"
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/getPlaceData"
});

const PlaceData = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); 
    const location = useLocation();
    const { city } = location.state || { city: "error" };
    const { days } = location.state || { days: "error" };
    const [maxCount, setCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const verifySession = async () => {
            try {
                const sessionToken = localStorage.getItem('token');
                if (sessionToken) {
                    const response = await axios.post('http://127.0.0.1:8000/verify_session', {}, {
                        headers: {
                            Authorization: sessionToken
                        }
                    });
                    setIsLoggedIn(response.data.status);
                    
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.log('Session verification error:', error);
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifySession();
    }, []);


    useEffect(() => {
        const verifySession = async () => {
            try {
                const sessionToken = localStorage.getItem('token');
                if (sessionToken) {
                    const response = await axios.post('http://127.0.0.1:8000/verify_session', {}, {
                        headers: {
                            Authorization: sessionToken
                        }
                    });
                    setIsLoggedIn(response.data.status);
                    for (let i = 0; i < data.length; i++) {
                        setCount(prevCount => (prevCount > data[i].day ? prevCount : data[i].day));
                    }
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.log('Session verification error:', error);
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifySession();
    }, [data]);




    return (
        <>
            <Header isLoggedIn={isLoggedIn}/>
            <div className='container PlaceData'>
                <div className='container mt-3 p-5'>
                    {loading ? (
                        <div className="spinner-border text-primary " style={{marginLeft : "48%"}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <>
                            <div>
                            {data && data.length > 0 && [...Array(Math.min(days, maxCount))].map((_, i) => {
                                const dayNumber = i + 1;
                                const filteredData = data.filter(place => place.day === dayNumber);
                                return (
                                    <div key={dayNumber}>
                                        <h1 className='h2 fw-bolder fs-1 mt-3'>Day {dayNumber}</h1>
                                        <div className='row row-col-3'>
                                            {filteredData.map(place => (
                                                <div className='col-4 col-sm-12 col-md-6 col-lg-4 mt-2 mb-2' key={place.fsq_id}>
                                                    <div className="card cardData">
                                                        <div className="card-header fw-bolder text-white">
                                                            {place.name}
                                                        </div>
                                                        <img src={place.image} className="card-img-top rounded-0" alt={place.name} style={{ height: "25vh" }} />
                                                        <div className="card-body text-center">
                                                            <p className="fw-bolder">Category : {place.category}</p>
                                                            <div className='container bg-primary-subtle mt-1 mb-2 rounded-2 border p-1'>
                                                                <p className='fw-bolder'>Address : {place.address}</p>
                                                            </div>
                                                            <ul className="list-group">
                                                                {place.review.map(review => (
                                                                    <li className="list-group-item" key={review.id}>
                                                                        <p>{review.text}</p>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <hr />
                                    </div>
                                );
                            })}
                        </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );    
}

export default PlaceData;


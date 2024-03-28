import React, { useEffect, useState } from 'react';
import Header from "./Header"
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/getPlaceData"
});

const PlaceData = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // State variable to track loading state
    const location = useLocation();
    const { city } = location.state || { city: "error" }; // Provide a default value if location.state is undefined
    const { days } = location.state || { days: "error" }; 

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
        const fetchData = async () => {
            try {
                const response = await api.post("", { destinationCity: city });
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Update loading state when response is received
            }
        };

        fetchData();
    }, [city]);
    console.log(days);

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    return (
        <>
        <Header status={isLoggedIn}/>
            <div className='container PlaceData'>
                <div className='container mt-3 p-5'>
                    <div className='row'>
                        {loading ? ( // Render loading indicator if data is still loading
                            <div className="spinner-border text-primary " style={{marginLeft : "48%"}} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            <>
                                <h3 className='fw-cold fs-1'>Day 1</h3>

                                {data && data.length > 0 && data.map(place => (
                                    <div className='col-4 col-sm-12 col-md-6 col-lg-4 mt-2 mb-2' key={place.fsq_id}>
                                        <div className="card cardData">
                                            <div className="card-header fw-bolder text-white">
                                                {place.name}
                                            </div>
                                            <div className="card-body text-center">
                                                <p className="fw-bolder">Category : {place.category}</p>
                                                <div className='container bg-primary-subtle mt-1 mb-2 rounded-2 border p-1'>
                                                    <p className='fw-bolder'>Address : {place.address}</p>
                                                </div>
                                                <ul className="list-group">{
                                                    place.review.map(review => (
                                                        <li className="list-group-item" key={review.id}>
                                                            <p>{review.text}</p>
                                                        </li>
                                                    ))
                                                }</ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlaceData;

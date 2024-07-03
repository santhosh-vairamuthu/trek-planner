import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/getNearPlaces"
});

const Suggestions = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [dataIsLoading, setDataIsLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [plans, setPlans] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

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

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            setError("Geolocation is not supported by this browser.");
            console.log(error);
        }
    };

    const showPosition = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
        fetchNearbyPlaces(latitude, longitude);
    };

    const showError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setError("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                setError("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                setError("An unknown error occurred.");
                break;
            default:
                setError("An error occurred.");
        }
    };

    const fetchNearbyPlaces = async (latitude, longitude) => {
        try {
            setDataIsLoading(true);
            const response = await api.post("", { latitude, longitude });
            setData([...response.data.data]);
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setDataIsLoading(false); 
        }
    };

    const fetchUserPlans = async () => {
        try {
            const sessionToken = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/getUserPlans', {
                headers: {
                    Authorization: sessionToken
                }
            });
            setPlans(response.data.plans);
        } catch (error) {
            console.error('Error fetching user plans:', error);
        }
    };
    

    useEffect(() => {
        fetchUserPlans();
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    const handleAddToPlan = (city) => {
        setSelectedCity(city);
        setModalOpen(true);
    };
    const handleAddition = async (plan_id) => {
        try {
            const updatedCity = {...selectedCity,plan_id: plan_id};
            const sessionToken = localStorage.getItem('token');
            await axios.post('http://127.0.0.1:8000/saveCityToPlan', 
                updatedCity,
                {
                    headers: {
                        Authorization: sessionToken
                    }
                }
            );
        } catch (error) {
            console.error('Error saving city to plan:', error);
        } finally{
            setModalOpen(false);
        }
    }
    

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <div className="container-flex">
                <div className="Suggestions container mt-3">
                    <div className="container p-3">
                        <h1 className="fw-bold fs-1">Find nearby trek spots</h1>
                        <button className="mt-2 locationButton" onClick={getLocation}>Search</button>
                        {dataIsLoading && (
                            <div className="text-center my-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                        <div className="row row-cols-md-3 row-cols-sm-2 row-cols-lg-3">
                            {data && data.length > 0 && data.map((place) => (
                                <div key={place.fsq_id} className="col-4 col-sm-12 col-md-6 col-lg-4 mt-2 mb-2">
                                    <div className="card cardData">
                                        <div className="card-header bg-info fw-bolder text-white">
                                            {place.name}
                                        </div>
                                        <img src={place.image} className="card-img-top rounded-0" alt={place.name} style={{ height: "25vh" }} />
                                        <div className="card-body text-center">
                                            <p className="fw-bolder">Category: {place.category}</p>
                                            <div className="container bg-primary-subtle mt-1 mb-2 rounded-2 border p-1">
                                                <p className="fw-bolder">Address: {place.address}</p>
                                            </div>
                                            <ul className="list-group">
                                                {place.review.map(review => (
                                                    <li className="list-group-item" key={review.id}>
                                                        <p>{review.text}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="container d-flex flex-row gap-1 mt-2 justify-content-center align-items-center">
                                                <button className="btn btn-info" onClick={() => handleAddToPlan(place)}>
                                                    <i className="bi bi-plus-square-fill"></i> Add to Plan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {modalOpen && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    {/* Modal content */}
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{maxWidth : "60vw", maxHeight : "60vh"}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add City to Plan</h5>
                                <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Select a plan to add {selectedCity && selectedCity.name} to:</p>
                                <ul className="list-group">
                                    {plans.map(plan => (
                                        <li key={plan.id} className="list-group-item d-flex justify-content-between">
                                            <p>{plan.plan_city}</p>
                                            <p>{formatDate(plan.created_at)}</p>
                                            <button className='btn btn-info' onClick={()=>{handleAddition(plan.plan_id)}}><i className="bi bi-plus-circle-fill"></i></button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={()=>{handleAddition("new")}}>Add to New Plan</button>
                            </div>
                        </div>
                    </div>
                </div>
            
            )}
        </>
    );
};

export default Suggestions;


{/* <div className='container mt-3'>
                        <h1 className='fw-bolder fs-3'>Trek planner's suggestions</h1>
                        <p className='fw-lighter fst-italic'> Refresh to see more</p>
                        <div className=' row row-cols-md-3 row-cols-sm-2 row-cols-lg-3'>
                        </div>
                    </div> */}
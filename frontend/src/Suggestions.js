import React, { useState } from 'react';
import goa from "./assets/goa.jpg"
import goa1 from "./assets/goa1.jpg"


const Suggestions = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [restaurants, setRestaurants] = useState([]);

    const getLocation = () => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
        setError("Geolocation is not supported by this browser.");
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

    const fetchNearbyPlaces = (latitude, longitude) => {
        
    };

    return (
        <div className="container-flex ">
            <div className='Suggestions container mt-3'>
                <div className='container p-3'>
                    <h1 className='fw-bold fs-1'>Find nearby trek spots </h1>
                    <button className='mt-2 locationButton' onClick={getLocation}>Find My Location</button>
                    <div id="demo">{location && `Your Location: Latitude: ${location.latitude}, Longitude: ${location.longitude}`}</div>
                    <div className=' row row-cols-md-3 row-cols-sm-2 row-cols-lg-3'>
                        <div className='col'>
                            <div className="card p-0 mt-2 mb-2" style={{ width: "20rem"}}>
                                <img src={goa1} className="card-img-top card-img" alt="" />
                                <div className="card-body p-3">
                                    <h5 className="card-title fw-bolder">Marina Beach</h5>
                                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
                <div className='container mt-3'>
                    <h1 className='fw-bolder fs-3'>Trek planner's suggestions</h1>
                    <p className='fw-lighter fst-italic'> Refresh to see more</p>
                    <div className=' row row-cols-md-3 row-cols-sm-2 row-cols-lg-3'>
                        <div className='col'>
                            <div className="card p-0 mt-2 mb-2" style={{ width: "20rem", position: "relative" }}>
                                <img src={goa} className="card-img-top card-img" alt="" />
                                <button className="btn bi bi-bookmark-heart-fill saveButtonImage"></button>
                                <div className="card-body p-3">
                                    <h5 className="card-title fw-bolder">Goa</h5>
                                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Suggestions;

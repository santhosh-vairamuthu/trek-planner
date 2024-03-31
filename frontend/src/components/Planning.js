import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from "./Header"
import { Link } from 'react-router-dom';

const Planning = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [destination, setDestination] = useState('');
    const [travelDate, setTravelDate] = useState('');
    const [travelDuration, setTravelDuration] = useState(1);
    // const [activities, setActivities] = useState([]);
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);
    const today = new Date().toISOString().split('T')[0];

    const category = {
        "Arts and Entertainment": "10000",
        "Landmarks and Outdoors": "16000",
        "Spiritual Center / Temple": "12111",
        "Museum": "10027",
        "Monument": "16026",
        "Historic and Protected Site": "16020",
        "Scenic Lookout, Nature view points": "16046"
    };

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



    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
    const handleDecreaseDays = () => {
        setTravelDuration(prevDuration => Math.max(parseInt(prevDuration, 10) - 1, 1));
    };

    const handleIncreaseDays = () => {
        setTravelDuration(prevDuration => parseInt(prevDuration, 10) + 1);
    };

    // const handleStartTimeChange = (activityName, startTime) => {
    //     const updatedActivities = activities.map(activity => {
    //         if (activity.name === activityName) {
    //             return { ...activity, startTime };
    //         }
    //         return activity;
    //     });
    //     setActivities(updatedActivities);
    // };

    const handlePlaceCheckboxChange = (placeName) => {
        if (selectedPlaces.includes(placeName)) {
            setSelectedPlaces(selectedPlaces.filter(place => place !== placeName));
        } else {
            setSelectedPlaces([...selectedPlaces, placeName]);
        }
    };

    const handleDestinationChange = (e) => {
        const input = e.target.value;
        setDestination(input);
        const options = [];
        // Filter cities based on input
        if (input.length > 0) {
            const cities = ['Chennai', 'Madurai', 'Cochin', 'Kovilpatti', 'Ooty', 'Kodaikanal', 'Coimbatore', 'Bengaluru'];
            cities.forEach(city => {
                if (city.toLowerCase().includes(input.toLowerCase())) {
                    options.push(city);
                }
            });
        }
        setAutocompleteOptions(options);
    };

    const handleSelectDestination = (selectedOption) => {
        setDestination(selectedOption);
        setAutocompleteOptions([]);
    };

    if (isLoading) {
        return <div>Loading...</div>; 
    }
    return (
        <>
            <Header isLoggedIn={isLoggedIn}/>
            <div className="container custom-container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="container custom-heading-container">
                            <h2 className="mb-4 mt-5 fw-bold">Share Your Travel Desires</h2>
                        </div>
                        <p className="custom-description">Embark on unforgettable adventures with our personalized trek planner!!</p>
                        <form onSubmit={handleSubmit}>
                        <div className="mb-3 mt-5 position-relative">
                                <label htmlFor="destination" className="form-label"><strong>Enter your destination of choice:</strong></label>
                                <input 
                                    type="text" 
                                    id="destination" 
                                    className="form-control" 
                                    value={destination} 
                                    onChange={handleDestinationChange} 
                                />
                                {autocompleteOptions.length > 0 && (
                                    <ul className="list-group position-absolute w-100" style={{ top: '100%', zIndex: '1000' }}>
                                        {autocompleteOptions.map((option, index) => (
                                            <li 
                                                key={index} 
                                                className="list-group-item" 
                                                onClick={() => handleSelectDestination(option)}
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <hr className='mt-3'/>
                            <div className="mb-3">
                                <label htmlFor="travelDate" className="form-label"><strong>Enter your preferred travel dates:</strong></label>
                                <input type="date" id="travelDate" className="form-control" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} min={today} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="travelDuration" className="form-label"><strong>Enter the days of your travel:</strong></label>
                                <div className="input-group">
                                    <button type="button" className="btn btn-primary custom-btn" onClick={handleDecreaseDays}>-</button>
                                    <input type="number" id="travelDuration" className="form-control" value={travelDuration} onChange={(e) => setTravelDuration(e.target.value)} style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }} />
                                    <button type="button" className="btn btn-primary custom-btn" onClick={handleIncreaseDays}>+</button>
                                </div>
                            </div>
                            {/* <div className="mb-3 mt-3">
                                <label htmlFor="travelWith" className="form-label"><strong>Enter your travel companions for your next adventure:</strong></label>
                                <div className="card-group">
                                    {Object.entries({
                                        "Backpacker": "&#x1F468; Backpacker",
                                        "Solo": "&#x1F464; Solo",
                                        "Couple": "&#x1F46B; Couple",
                                        "Family": "&#x1F46A; Family",
                                        "Friends": "&#x1F46B; Friends"
                                    }).map(([key, value]) => (
                                        <div key={key} className={`card ${travelWith === key ? 'bg-primary text-white' : ''}`} onClick={() => handleTravelWithClick(key)}>
                                            <div className="card-body custom-card-body">
                                                <h5 className="card-title" style={{ fontSize: '12px' }} dangerouslySetInnerHTML={{__html: value}}></h5>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                            <div className="mb-3 mt-3">
                                <label htmlFor="destination" className="form-label"><strong>Select places you would like to visit:</strong></label>
                                {Object.keys(category).map((key) => (
                                    <div key={key} className="form-check">
                                        <input type="checkbox" className="form-check-input" id={key} value={category[key]} onChange={() => handlePlaceCheckboxChange(key)} checked={selectedPlaces.includes(key)} />
                                        <label className="form-check-label" htmlFor={key}>{key}</label>
                                    </div>
                                ))}
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="start-time" className="form-label"><strong>Enter your start time:</strong></label>
                                <input type="time" className="form-control" id="start-time" onChange={(e) => handleStartTimeChange("Beaches", e.target.value)} />
                            </div> */}
                            <div className="mb-3 text-center"> 
                                <Link to='/placedata' state={{ city: destination, days : travelDuration }} className="btn btn-primary custom-submit-btn">Create Plan</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Planning;

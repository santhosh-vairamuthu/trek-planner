import React, { useEffect, useState } from 'react';
import Header from "./Header"
import { useLocation } from 'react-router-dom';
import axios from 'axios';



const PlaceData = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 
    const location = useLocation();
    const { planId } = location.state || { planId : "error" };
    const { days } = location.state || { days : "error" };
    const [data, setData] = useState("")

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
        const getPlanData = async () => {
            console.log(planId);
            try {
                const response = await axios.get('http://127.0.0.1:8000/getPlanData', {
                    params: { plan_id: planId } 
                });
                setData([...response.data.plans]);
            } catch (error) {
                console.log('Session verification error:', error);
                setIsLoggedIn(false);
            }
        };
    
        getPlanData();
    }, [planId]);
    


    if (isLoading) {
        return <div>Loading...</div>; 
    }



    return (
        <>
            <Header isLoggedIn={isLoggedIn}/>
            <div className='container PlaceData'>
                <div className='container mt-3 p-5'>
                    <>
                        <div>
                        {data && data.length > 0 && [...Array(days)].map((_, i) => {
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
                </div>
            </div>
        </>
    );    
}

export default PlaceData;


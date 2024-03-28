import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from "./Header"
import pastImage from "./assets/pastEventImage.jpg";
// import ongoingImage from "./assets/ongoingEventImage.jpg";
// import upcomingImage from "./assets/upcomingEventImage.jpg";

const Account = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 

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

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    return (
        <>
        <Header  isLoggedIn={isLoggedIn}/>
            <div className="d-flex justify-content-center mt-5">
                {/* Your event cards */}
                {/* Example of a card */}
                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                    <div className="row g-0" style={{ maxWidth: "640px" }}>
                        {/* Image column */}
                        <div className="col-md-4 d-flex align-items-center justify-content-center">
                            <div style={{ height: "100%" }}>
                                <img src={pastImage} alt="Past Event" className="img-fluid rounded-start" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                            </div>
                        </div>

                        {/* Details column */}
                        <div className="col-md-8">
                            <div className="card-body" style={{ height: "300px" }}>
                                <span className="badge bg-danger text-white">Past</span>
                                <h5 className="card-title"> Family Tale</h5>
                                <div className="card-text">
                                    <div><strong>Location:</strong> Mount Everest, Nepal</div>
                                    <div><strong>Date:</strong> Jan 1 - 5, 2024 (5 days)</div>
                                    <div><strong>Start Time:</strong> 08:00 am</div>
                                </div>
                                <br></br>
                                <button className="btn btn-primary" >Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    );
};

export default Account;

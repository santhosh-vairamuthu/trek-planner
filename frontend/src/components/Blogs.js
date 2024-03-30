import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from "./Header"
import { Link } from 'react-router-dom';
import goa from '../assets/goa.jpg';

const Blogs = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 
    const [city, setCity] = useState(null);

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
            <div className='container Blogs'>
                <div className="container mt-3 py-5">
                    <div className='container d-flex justify-content-center mt-2 mb-5'>
                        <form>
                            <input className='form-control searchCity rounded-5 px-4 py-2' type="text" placeholder='Enter a city ' value={city} onChange={(e)=>{setCity(e.target.value)}} />
                        </form>

                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
                            <Link to="/blogdata" style={{ textDecoration: 'none' }}>
                                <div className="card">
                                    <img src={goa} className="card-img-top img-fluid" alt="" />
                                    <div className="card-body">
                                        <h5 className="card-title fw-bolder">GOA</h5>
                                        <p className="card-text">Goa, a coastal paradise blending Indian and Portuguese influences, beckons with its stunning beaches, vibrant culture, and lively nightlife.</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blogs;

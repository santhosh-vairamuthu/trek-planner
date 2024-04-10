import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import  { useNavigate, Link } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/account',
});

const Account = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const navigate = useNavigate();
    const [planData, setPlanData] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const verifySession = async () => {
            try {
                const sessionToken = localStorage.getItem('token');
                if (sessionToken) {
                const response = await axios.post('http://127.0.0.1:8000/verify_session', {}, {
                    headers: {
                    Authorization: sessionToken,
                    },
                });
                setIsLoggedIn(response.data.status);
                } else {
                setIsLoggedIn(false);
                }
            } catch (error) {
                console.log('Session verification error:', error);
                setIsLoggedIn(false);
            }
        };
        verifySession();
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            const getData = async () => {
                try {
                const sessionToken = localStorage.getItem('token');
                const response = await api.get('', {
                    headers: {
                    Authorization: sessionToken,
                    },
                });
                setUserName(() => response.data.user);
                setPlanData([...response.data.plans]);
                } catch (error) {
                console.error('Error fetching data:', error);
                }
            };
            getData();
        }
    }, [isLoggedIn]); // Run only when isLoggedIn changes

    return (
        <>
        <Header isLoggedIn={isLoggedIn} />
        {isLoggedIn ? (
            <>
            <div className="container mt-5 Account">
                <div className='h2 fw-bolder'>Hello {userName},</div>
                    <div className='container  mt-3'>
                        <p className='fs-4 d-flex justify-content-center'>Your Plans</p>
                        <div className='container row'>
                            {planData && planData.map((plan) => (
                            <div className='col-4' key={plan.id}>
                                <div className="card">
                                    <div className="card-body text-center justify-content-center align-items-center">
                                        <h5 className="card-title fw-bolder">{plan.plan_city}</h5>
                                        <p className="card-text">Days : {plan.totalDays}</p>
                                        <p className='card-text'>Created at {plan.created_at}</p>
                                        <Link to='/viewplan'  state={{ planId: plan.plan_id, days : plan.totalDays}} className='btn btn-info'>View Plan <i className="bi bi-eye-fill"></i></Link>
                                    </div>
                                </div>
                            </div>
                            ))}
                    </div>
                </div>
            </div>
            </>
        ) : (navigate('/auth'))}
        </>
    );
};

export default Account;

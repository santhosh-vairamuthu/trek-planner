import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { useNavigate, Link } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/account',
});

const Account = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const navigate = useNavigate();
    const [planData, setPlanData] = useState(null);
    const [userName, setUserName] = useState(null);
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [blogContent, setBlogContent] = useState('');
    const [blogImages, setBlogImages] = useState([]);

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

    const openModal = (planId) => {
        setShowModal(true);
        setSelectedPlanId(planId);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPlanId(null);
        setBlogContent('');
        setBlogImages([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const sessionToken = localStorage.getItem('token');
            const base64Images = await Promise.all(blogImages.map(file => new Promise((resolve, reject) => {
                const reader = new FileReader();
    
                reader.onload = function(event) {
                    const base64String = event.target.result;
                    resolve(base64String);
                };
    
                reader.onerror = function(error) {
                    reject(error);
                };
    
                reader.readAsDataURL(file);
            })));
    
            await axios.post(
                'http://127.0.0.1:8000/create_blog',
                {
                    planId: selectedPlanId,
                    blogContent: blogContent,
                    blogImages: base64Images
                },
                {
                    headers: {
                        Authorization: sessionToken
                    }
                }
            );
    
            handleCloseModal();
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };
    
    

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            {isLoggedIn ? (
                <>
                    <div className="container mt-5 Account">
                        <div className='h2 fw-bolder'>Hello {userName},</div>
                        <div className='container mt-3'>
                            <p className='fs-4 d-flex justify-content-center'>Your Plans</p>
                            <div className='container row '>
                            {planData && planData.map((plan) => (
                                <div className='col-4 mt-3 mb-3' key={plan.id}>
                                    <div className="card">
                                        <div className="card-body text-center justify-content-center align-items-center">
                                            <h5 className="card-title fw-bolder">{plan.plan_city}</h5>
                                            <p className="card-text">Days : {plan.totalDays}</p>
                                            <p className='card-text'>Created at {plan.created_at}</p>
                                            <div className='d-flex gap-2 justify-content-center'>
                                                <Link to='/viewplan' state={{ planId: plan.plan_id, days: plan.totalDays }} className='btn btn-info'>View Plan <i className="bi bi-eye-fill"></i></Link>
                                                {(!plan.plan_city.includes("SuggestedPlans")) && (
                                                    <button onClick={() => openModal(plan.plan_id)} className='btn btn-info'>Write a Blog</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            </div>
                        </div>
                    </div>
                    {showModal && (
                        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                            <div className="modal-dialog modal-dialog-centered" role="document" style={{maxWidth : "60vw", maxHeight : "60vh"}}>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Share your stories</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="blogContent" className="form-label">Blog Content</label>
                                                <textarea className="form-control" id="blogContent" rows="3" value={blogContent} onChange={(e) => setBlogContent(e.target.value)} required></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="blogPics" className="form-label">Blog Images</label>
                                                <input type="file" className="form-control" id="blogPics" onChange={(e) => setBlogImages([...e.target.files])} multiple />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (navigate('/auth'))}
        </>
    );
};

export default Account;

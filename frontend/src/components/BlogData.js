import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from "./Header"
import goa from '../assets/goa.jpg'
import goa1 from '../assets/goa1.jpg'
import goa2 from '../assets/goa2.jpg'
import goa3 from '../assets/goa3.jpg'
import goa4 from '../assets/goa4.jpg'
import { useLocation } from 'react-router-dom';

const BlogData = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const { planId } = location.state || { planId : "error" };

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
        <Header isLoggedIn={isLoggedIn}/>
            <div className='container-fluid BlogData'>
                <div className="container-fluid mt-3">
                    <div className="container" style={{ position: "relative" }}>
                        <div className="container blogBannerData p-5">
                            <h1 className="card-title  fs-1 fw-bold mt-3">5 Days trip to Madurai</h1>
                            <button className='btn btn-light mt-5 p-2'>View Plan</button>
                        </div>
                        <img src={goa4} className="blogBanner rounded-2" alt="" />
                    </div>
                    <div className='container mt-2 px-5'>
                        <div className='container d-flex px-5 justify-content-between'>
                            <h3 className='fs-2 fw-bolder '>Madurai</h3>
                            <p className='fs-5 fw-light '>July 13, 2023 </p>
                        </div>
                        <div className='container mt-3 px-5'>
                            <p className='fw-bolder fs-5 px-5 font-monospace' style={{lineHeight : "2.2rem"}}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ipsum atque similique sunt perferendis veniam laboriosam voluptas nam odit, nisi itaque quis perspiciatis quasi dolor vel maiores cum rerum eveniet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quos sequi tenetur ducimus nemo ullam repudiandae quisquam labore illo officia. Iure reiciendis aliquam laudantium modi odio quidem libero inventoreLorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ipsum atque similique sunt perferendis veniam laboriosam voluptas nam odit, nisi itaque quis perspiciatis quasi dolor vel maiores cum rerum eveniet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quos sequi tenetur ducimus nemo ullam repudiandae quisquam labore illo officia. Iure reiciendis aliquam laudantium modi odio quidem libero inventoreLorem ipsum dolor sit amet consectetur adipisicing elit. 
                            </p>
                            <hr/>
                        </div>
                        <div className='container mt-3 mb-3 px-5'>
                            <h3 className='fw-bold fs-3 mt-3 mb-3'>Pics:</h3>
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                                <div className="col">
                                <img src={goa1} className="img-fluid rounded" alt="img" />
                                </div>
                                <div className="col">
                                <img src={goa2} className="img-fluid rounded" alt="img" />
                                </div>
                                <div className="col">
                                <img src={goa3} className="img-fluid rounded" alt="img"/>
                                </div>
                                <div className="col">
                                <img src={goa4} className="img-fluid rounded" alt="img"/>
                                </div>
                                <div className="col">
                                <img src={goa} className="img-fluid rounded" alt="img"/>
                                </div>
                                <div className="col">
                                <img src={goa1} className="img-fluid rounded" alt="img"/>
                                </div>
                            </div>
                            </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default BlogData;

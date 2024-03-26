import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from "./Header"
import image1 from "./assets/pic1.jpg"
import image2 from "./assets/pic2.jpg"
import image3 from "./assets/pic3.jpeg"
import { Link } from "react-router-dom"


const Home = () => {
    const [state, setState] = useState(false);


    useEffect( () => {
        const verify = async () => {
            try {
            const sessionToken = localStorage.getItem('token');
            if (sessionToken) {
                const response = await axios.post('http://127.0.0.1:8000/verify_session',{},
                    {
                        headers: {
                            Authorization: `Bearer ${sessionToken}`
                        }
                    }
                );
                console.log('Session verification response:', response.data.status);
                setState(()=>{return (response.data.status)})
            } else {
                console.log('Session token not found');
            }
            } catch (error) {
                console.log('Session verification error:', error);
            }
        }
        verify();
    }, []);

    return (
        <>
        <Header status={state}/>
            <div className="container Home">
                <div className='container rounded-5 mt-5 mb-5 banner p-5'>
                    <div className='container'>
                        <h1 className='bannerTitle text-white mb-2'>Craft Unforgettable Travel with Trek Planner</h1>
                        <p className='bannerDescription mt-2'>Your personalized digital companion for seamless trip planning, <br/>itinerary customization, and expert travel recommendations!</p>
                        <Link className='btn bannerButton px-5' to='/plan'>Get Started</Link>
                        <div className='container d-sm-none d-lg-block' style={{minHeight:"40vh"}}></div>
                    </div>
                </div>

                <section className="header-section row p-2">
                    <div className="content-container col-8">
                        <div className="content-text rounded-4 p-4">
                            <h2>An Easier Trip, Every Time</h2>
                            <p>Imagine a seamless travel experience where all your trip details are organized in one place, and you receive timely updates throughout your journey. Discover why millions of travelers rely on Trek Planner for stress-free travel.</p>
                        </div>
                    </div>
                    <div className="content-container col-4  ms-auto offset">
                        <div className="content-image">
                            <img src={image1} alt="" className="rounded img-thumbnail" />
                        </div>
                    </div>
                </section>

                <section className="header-section row p-2">
                    <div className="content-container col-4 ">
                        <div className="content-image">
                            <img src={image2} alt="" className="rounded img-thumbnail" />
                        </div>
                    </div>
                    <div className="content-container col-8">
                        <div className="content-text rounded-4 p-4 ms-auto offset">
                        <h2>Get Started</h2>
                        <p>With your mobile phone in hand, embark on a journey of simplicity and convenience. Experience seamless travel planning at your fingertips.Discover personalized recommendations tailored to your preferences. Navigate unfamiliar cities with ease using our intuitive maps and guides. Make every trip a memorable adventure with Trek Planner</p>
                        </div>
                    </div>
                </section>


                <section className="header-section row p-2">
                    <div className="content-container col-8">
                        <div className="content-text rounded-4 p-4">
                        <h2>We Plan, You Explore</h2>
                        <p>Unlike other travel apps, Trek Planner seamlessly organizes your travel plans, no matter where you book. Trek Planner will create a comprehensive itinerary for every trip.</p>
                        </div>
                    </div>
                    <div className="content-container col-4">
                        <div className="content-image">
                            <img src={image3} alt="" className="rounded img-thumbnail" />
                        </div>
                    </div>
                </section>


            </div>
        </>
    );
};

export default Home;

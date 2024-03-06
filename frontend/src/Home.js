import React from 'react'

const Home = () => {
    return (
        <div className="container Home">
            <div className='container rounded-5 mt-5 mb-5 banner p-5'>
                <div className='container'>
                    <h1 className='bannerTitle text-white mb-2 '>Craft Unforgettable Travel with Trek Planner</h1>
                    <p className='bannerDescription mt-2'>Your personalized digital companion for seamless trip planning, <br/>itinerary customization, and expert travel recommendations!</p>
                    <button className='btn bannerButton px-5'>Get Started</button>
                    <div className='container d-sm-none d-lg-block' style={{minHeight:"40vh"}}></div>
                </div>
            </div>
        </div>
    )
}

export default Home
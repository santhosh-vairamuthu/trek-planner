import React from 'react';
import { Link } from 'react-router-dom';
import goa from './assets/goa.jpg';

const Blogs = () => {
    return (
        <div className='container Blogs'>
            <div className="container mt-3 py-5">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
                        <Link to="/blogdata" style={{ textDecoration: 'none' }}>
                            <div className="card">
                                <img src={goa} className="card-img-top img-fluid" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">GOA</h5>
                                    <p className="card-text">Goa, a coastal paradise blending Indian and Portuguese influences, beckons with its stunning beaches, vibrant culture, and lively nightlife.</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blogs;

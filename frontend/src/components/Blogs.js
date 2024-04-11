import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "./Header"
import { Link } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/blogs',
});

const Blogs = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [city, setCity] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

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
        const getBlogData = async () => {
            try {
                const sessionToken = localStorage.getItem('token');
                const response = await api.get('', {
                    headers: {
                        Authorization: sessionToken,
                    },
                });
                setData([...response.data.data]);
                setFilteredData([...response.data.data]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getBlogData();
    }, []);

    useEffect(() => {
        const filterData = () => {
            if (!city) {
                setFilteredData([...data]);
            } else {
                const filtered = data.filter(blog => blog.plan_city.toLowerCase().includes(city.toLowerCase()));
                setFilteredData(filtered);
            }
        };

        filterData();
    }, [city, data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <div className='container Blogs'>
                <div className="container mt-3 py-5">
                    <div className='container d-flex justify-content-center mt-2 mb-5'>
                        <form>
                            <input className='form-control searchCity rounded-5 px-4 py-2' type="text" placeholder='Enter a city ' value={city} onChange={(e) => { setCity(e.target.value) }} />
                        </form>
                    </div>
                    <div className="row">
                        {filteredData.length > 0 && filteredData.map((blog, index) => (
                            <div className="col-lg-4 col-md-4 col-sm-6 mb-4" key={index}>
                                <Link to="/blogdata" style={{ textDecoration: 'none' }} state={{ planId: blog.plan_id }}>
                                    <div className="card">
                                        {/* Check if images array is not empty */}
                                        {blog.images.length > 0 ? (
                                            // <img src={`data:image/png;base64,${blog.images[0]}`} className="card-img-top img-fluid" alt="" />
                                            <img src={blog.images[0]} className="card-img-top img-fluid" alt="" />
                                        ) : (
                                            <img src={"https://placehold.co/600x400"} className="card-img-top img-fluid" alt="" />
                                        )}
                                        <div className="card-body">
                                            <h5 className="card-title fw-bolder">{blog.plan_city}</h5>
                                            <h6 className="text-black-50 fw-bolder">{blog.date_created}</h6>
                                            <p className="card-text">{blog.blog_content}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blogs;

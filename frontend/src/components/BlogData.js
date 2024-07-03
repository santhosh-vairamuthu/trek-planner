import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from "./Header"
import { useLocation, } from 'react-router-dom';
import { Link } from 'react-router-dom';


const BlogData = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const { planId } = location.state || { planId : "error" };
    const [data, setData] = useState({});

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
        function dateConversion(inputDate) {
            const dateObj = new Date(inputDate);
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const day = dateObj.getDate();
            const month = monthNames[dateObj.getMonth()];
            const year = dateObj.getFullYear();
        
            return `${month} ${day}, ${year}`;
        }
        
        const getPlanData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/getPlanDataById', {
                    params: { plan_id: planId }
                });
                const planData = response.data.data;
                const formattedDate = dateConversion(planData.date_created);
                setData(()=>{return { ...planData, date_created : formattedDate }})
                console.log(typeof(data.images));
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
            <div className='container-fluid BlogData'>
                <div className="container-fluid mt-3">
                    <div className="container" style={{ position: "relative" }}>
                        <div className="container blogBannerData p-5">
                        <Link to='/viewplan' state={{ planId: data.plan_id, days: data.totalDays, city: data.plan_city  }} className='btn btn-info'>View Plan <i className="bi bi-eye-fill"></i></Link>
                        </div>
                        { data && data.images && data.images.length > 0 ? (
                            <img src={data.images[0]} className="blogBanner rounded-2" alt=""/>
                        ) : (
                            <img src={"https://placehold.co/600x400"} className="blogBanner rounded-2" alt=""/>
                        )}
                    </div>
                    <div className='container mt-4 px-5'>
                        <div className='container d-flex px-5 justify-content-between'>
                            <h3 className='fs-2 fw-bolder '>{data.plan_city}</h3>
                            <p className='fs-5 fw-light '>{data.date_created} </p>
                        </div>
                        <div className='container mt-3 px-5'>
                            <p className='fw-bolder fs-5 px-5 font-monospace' style={{lineHeight : "2.2rem"}}>{data.blog_content}</p>
                            <hr/>
                        </div>
                        {data && data.images && data.images.length > 0 && (
                            <div className='container mt-3 mb-3 px-5'>
                                <h3 className='fw-bold fs-3 mt-3 mb-3'>Pics:</h3>
                                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                                    {data.images.map((img, index) => (
                                        <div className="col" key={index}>
                                            <img src={img} className="img-fluid rounded" alt={`img-${index}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}


                    </div>

                </div>
            </div>
        </>
    );
}

export default BlogData;

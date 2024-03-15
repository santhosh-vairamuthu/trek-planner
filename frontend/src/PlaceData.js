import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/getPlaceData"
});

const PlaceData = () => {
    const [data, setData] = useState(null);
    const location = useLocation();
    const { city } = location.state || { city: "error" }; // Provide a default value if location.state is undefined

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post("", { destinationCity: city });
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [city]);

    return (
        <div className='container PlaceData'>
            <div className='container mt-3 p-5'>
                <div className='row'>
                    {data && data.length > 0 && data.map(place => (
                        <div className='col-4 col-sm-12 col-md-6 col-lg-4 mt-2 mb-2' key={place.fsq_id}>
                            <div className="card cardData">
                                <div className="card-header fw-bolder text-white">
                                    {place.name}
                                </div>
                                <div className="card-body text-center">
                                    <p className="">Category : {place.category}</p>
                                    <p className="">Distance : {place.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlaceData;

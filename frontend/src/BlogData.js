import React from 'react';
import goa1 from './assets/goa1.jpg'
import goa2 from './assets/goa2.jpg'
import goa3 from './assets/goa3.jpg'
import goa4 from './assets/goa4.jpg'

const BlogData = () => {
    return (
        <div className='container BlogData'>
            <div className="container mt-3 p-5">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="blog-post">
                            <img src={goa1} alt="Beaches of Goa" className="place-image img-fluid" />
                            <h2>1. Calangute Beach</h2>
                            <p>Known as the "Queen of Beaches," Calangute Beach is one of the most popular and bustling beaches in Goa. It offers a vibrant atmosphere, with plenty of water sports activities, beach shacks serving delicious seafood, and lively nightlife options.</p>
                        </div>

                        <div className="blog-post">
                            <img src={goa2} alt="Beaches of Goa" className="place-image img-fluid" />
                            <h2>2. Basilica of Bom Jesus</h2>
                            <p>A UNESCO World Heritage Site, the Basilica of Bom Jesus is a magnificent example of Baroque architecture and houses the mortal remains of St. Francis Xavier. It is one of the oldest churches in Goa and a significant pilgrimage site for Catholics from around the world.</p>
                        </div>

                        <div className="blog-post">
                            <img src={goa3} alt="Beaches of Goa" className="place-image img-fluid" />
                            <h2>3. Dudhsagar Waterfalls</h2>
                            <p>Located in the Bhagwan Mahavir Wildlife Sanctuary in the Western Ghats, Dudhsagar Waterfalls is a majestic cascade surrounded by lush greenery. It is one of the tallest waterfalls in India, and visitors can enjoy trekking, swimming, and photography in its scenic surroundings.</p>
                        </div>

                        <div className="blog-post">
                            <img src={goa4} alt="Beaches of Goa" className="place-image img-fluid" />
                            <h2>4. Old Goa (Velha Goa)</h2>
                            <p>A historic district that was once the capital of Portuguese India, Old Goa is home to numerous churches, convents, and cathedrals dating back to the colonial era. Some notable attractions include the Se Cathedral, Church of St. Francis of Assisi, and Church of St. Cajetan, offering insights into Goa's rich cultural and architectural heritage.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogData;

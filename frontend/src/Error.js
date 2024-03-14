import React from 'react';
import { Link } from 'react-router-dom'

const Error = () => {

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <div style={{ fontSize: '72px', color: '#dc3545' }}>404</div>
            <div style={{ fontSize: '24px', color: '#6c757d', marginBottom: '30px' }}>
            Oops! Page not found.
            </div>
                <Link to="/" style={{ 
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: '18px'
                }}>
                Return to Home
                </Link>
        </div>
    );
}


export { Error };
export default Error;

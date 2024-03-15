import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import logo from "./assets/logo.png";

const Header = () => {

    const [showNav, setShowNav] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light  Header">
            <div className="container-fluid ">
                <Link className="navbar-brand  align-items-center" to="/">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top"alt="Logo"/>
                    <span className='trekTitle'> Trek Planner</span>
                </Link>
                <button className="navbar-toggler bi bi-list navbarButton " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"onClick={() => setShowNav(!showNav)}>
                    
                </button>
                <div className={`offcanvas offcanvas-start  ${showNav ? 'show' : ''}`} tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{margin : ""}}>
                    <div className="offcanvas-header d-sm-flex d-lg-none justify-content-end">
                        <button type="button" className="btn btn-lg bi-x cancelButton py-0 p-1 text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => setShowNav(false)}></button>
                    </div>
                    <div className="offcanvas-body d-inline" >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-4 justify-content-center ">
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={() => setShowNav(false)}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/blogs" onClick={() => setShowNav(false)}>Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/explore" onClick={() => setShowNav(false)}>Explore</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/plan" onClick={() => setShowNav(false)}>Plan</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/account" onClick={() => setShowNav(false)}>Account</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="collapse navbar-collapse justify-content-lg-end " id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="btn btn-lg signIn" to='/auth'>Sign in</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;

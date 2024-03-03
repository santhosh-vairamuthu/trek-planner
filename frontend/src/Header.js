import React, { useState } from 'react';
import logo from "./assets/logo.png";

const Header = () => {

    const [showNav, setShowNav] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid ">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="navbar-brand  align-items-center" href="#">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top"alt="Logo"/>
                    <span> Trek Planner</span>
                </a>
                <button className="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"onClick={() => setShowNav(!showNav)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`offcanvas offcanvas-start  ${showNav ? 'show' : ''}`} tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{margin : ""}}>
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => setShowNav(false)}></button>
                    </div>
                    <div className="offcanvas-body d-flex justify-content-end ">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-4">
                            <li className="nav-item">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a className="nav-link" href="#" onClick={() => setShowNav(false)}>Home</a>
                            </li>
                            <li className="nav-item">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a className="nav-link" href="#" onClick={() => setShowNav(false)}>Blog</a>
                            </li>
                            <li className="nav-item">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a className="nav-link" href="#" onClick={() => setShowNav(false)}>Plan</a>
                            </li>
                            <li className="nav-item">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a className="nav-link" href="#" onClick={() => setShowNav(false)}>Account</a>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="collapse navbar-collapse  justify-content-lg-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button className="btn btn-primary" >Sign in</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;

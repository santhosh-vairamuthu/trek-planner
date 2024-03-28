import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./assets/logo.png";

const Header = ({ isLoggedIn }) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light  Header">
            <div className="container-fluid">
                <Link className="navbar-brand  align-items-center" to="/">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="Logo"/>
                    <span className='trekTitle'> Trek Planner</span>
                </Link>
                <button className="navbar-toggler bi bi-list navbarButton " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" >
                    
                </button>
                <div className="offcanvas offcanvas-start"   tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{margin : ""}}>
                    <div className="offcanvas-header d-sm-flex d-lg-none justify-content-end">
                        <button type="button" className="btn btn-lg bi-x cancelButton py-0 p-1 text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body d-inline" >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-4 justify-content-center ">
                            <li className="nav-item">
                                <Link className="nav-link" to="/" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/blogs" >Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/explore" >Explore</Link>
                            </li>
                            {isLoggedIn !== false && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/plan" >Plan</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/account">Account</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
                {!isLoggedIn !== false && (
                    <div className="collapse navbar-collapse justify-content-lg-end" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="btn btn-lg signIn" to='/auth'>Sign in</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default React.memo(Header);

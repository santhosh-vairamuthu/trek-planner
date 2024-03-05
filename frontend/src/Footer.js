import logo from "./assets/logo.png";

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 Footer" >
            <div className="mt-3 container row">
                <p className="col-8 d-inline-flex justify-content-start" px-5>
                    <img src={logo} width="30" height="30" className="d-inline-block align-top"alt="Logo"/>
                    <span className='trekTitle'> Trek Planner</span>
                </p>
                <span className="col-4 d-inline-flex">© 2024 Trek planner</span>
            </div>
        </footer>
    )
}

export default Footer
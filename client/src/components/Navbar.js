import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <div className="container">

                <Link to="/">
                    <h1>Home</h1>

                </Link>

                <Link to="/map">
                    <h1>Map</h1>

                </Link>

                <Link to="/edit">
                    <h1>Edit</h1>

                </Link>
            </div>

        </header>
    )
}

export default Navbar;
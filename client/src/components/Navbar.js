import { Link } from 'react-router-dom'

const handleLogout = (e) => {
    sessionStorage.clear();
    window.location.reload();
}

const Navbar = () => {
    return (
        <header>
            <div className="navbar">

                <Link to="/">
                    <h1>Home</h1>

                </Link>

                <Link to="/maplist">
                    <h1>MapList</h1>

                </Link>

                <Link to="/map">
                    <h1>Map</h1>

                </Link>

                <Link to="/edit">
                    <h1>Edit</h1>

                </Link>
            </div>
            <button onClick={handleLogout}>Logout</button>

        </header>
    )
}

export default Navbar;
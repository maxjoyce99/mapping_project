import { Link } from 'react-router-dom';
import useToken from '../hooks/useToken';

const handleLogout = (e) => {
    sessionStorage.clear();
    window.location.reload();
}

const Navbar = () => {
    const {token, setToken} = useToken();
    return (
        <header>
            <div className="navbar">

                <Link to="/">
                    <h1>Home</h1>

                </Link>

                <Link to="/maplist">
                    <h1>Map List</h1>

                </Link>

                <Link to="/map" state={{userId: token._id}}>
                    <h1>My Map</h1>

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
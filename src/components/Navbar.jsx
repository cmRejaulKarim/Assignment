import { Link, NavLink } from "react-router";

export default function Navbar() {
    return (
        <div className="navbar bg-gray-400 px-6 sticky top-0 z-50">
            <div className="flex-1">
                <Link to="/" className="text-xl font-bold">
                    Movie Explorer
                </Link>
            </div>
            <div className="flex-none">
                <NavLink to="/movies" className="btn btn-primary rounded-none">
                    Movies
                </NavLink>
            </div>
        </div>
    );
}

import { Link } from "react-router";

export default function Home() {
    return (
        <div className="hero min-h-[70vh]">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Discover Movies
                    </h1>
                    
                    <p className="py-6 text-lg text-gray-600">
                        Explore and discover your favorite movies from around the world.
                    </p>
                    
                    <Link to="/movies" className="btn btn-primary rounded-none">
                        Explore Now
                    </Link>
                </div>
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import { getAllMovies, searchMovies } from "../service/MovieService";
import Loader from "../components/Loader";
import MovieCardModal from "../components/MovieCardModal";

export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                if (searchQuery) {
                    const data = await searchMovies(searchQuery);
                    setMovies(data);
                } else {
                    const data = await getAllMovies();
                    setMovies(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [searchQuery]);

    return (
        <div className="container mx-auto p-6">
            {/* Header: Title and Search Input */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold">All Movies</h1>

                <input
                    type="text"
                    placeholder="Search movie by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input border-0 bg-gray-200 rounded-none w-full sm:w-80"
                />
            </div>

            {loading && <Loader />}

            {!loading && movies.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-500">No movies found!</p>
                </div>
            )}

            {!loading && movies.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <div key={movie.id} className="card rounded-none bg-gray-300">
                            <div className="h-64 bg-gray-800">
                                {movie.image ? (
                                    <img
                                        src={movie.image}
                                        alt={movie.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-400">No Image Available</span>
                                )}
                            </div>

                            <div className="card-body p-4">
                                <h2 className="card-title text-lg font-bold">
                                    {movie.name}
                                </h2>

                                <p className="text-sm text-gray-600 mt-1">
                                    ⭐ Rating: {movie.rating || "N/A"} &nbsp;|&nbsp; 📅 Release: {movie.premiered ? movie.premiered.slice(0, 4) : "N/A"}
                                </p>

                                <button
                                    onClick={() => setSelectedMovie(movie)}
                                    className="btn btn-primary btn-sm rounded-none w-full mt-2"
                                >
                                    See Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedMovie && (
                <MovieCardModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}
        </div>
    );
}
